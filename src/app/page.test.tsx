import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Home from "./page";

const player = vi.hoisted(() => ({
  close: vi.fn<() => Promise<void>>(),
  create: vi.fn(),
  enqueue: vi.fn<(samples: Int16Array) => Promise<void>>(),
}));
const createObjectUrl = vi.fn<(blob: Blob) => string>();
const revokeObjectUrl = vi.fn<(url: string) => void>();

vi.mock("@/utils/streaming-player", () => ({
  StreamingPcmPlayer: class {
    constructor() {
      player.create();
    }

    enqueue(samples: Int16Array) {
      return player.enqueue(samples);
    }

    close() {
      return player.close();
    }
  },
}));

let streamController!: ReadableStreamDefaultController<Uint8Array>;
let streamSettled = false;

function closeStream() {
  streamSettled = true;
  streamController.close();
}

function errorStream(error: Error) {
  streamSettled = true;
  streamController.error(error);
}

beforeEach(() => {
  streamSettled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      streamController = controller;
    },
  });

  player.close.mockResolvedValue();
  player.enqueue.mockResolvedValue();
  createObjectUrl.mockReturnValue("blob:test-audio");
  Object.defineProperties(URL, {
    createObjectURL: {
      configurable: true,
      value: createObjectUrl,
    },
    revokeObjectURL: {
      configurable: true,
      value: revokeObjectUrl,
    },
  });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(stream)));
});

afterEach(() => {
  cleanup();
  if (!streamSettled) {
    closeStream();
  }
  Reflect.deleteProperty(URL, "createObjectURL");
  Reflect.deleteProperty(URL, "revokeObjectURL");
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it("생성 중 첫 PCM 청크를 자동 재생하고 결과 액션을 비활성화한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "안녕하세요",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => streamController.enqueue(Uint8Array.from([0, 0])));

  await waitFor(() => expect(player.enqueue).toHaveBeenCalledOnce());
  expect(player.enqueue).toHaveBeenCalledWith(Int16Array.from([0]));
  expect(screen.getByRole("button", { name: "다시 듣기" })).toBeDisabled();
  expect(
    screen.getByRole("heading", {
      name: "음성을 생성하며 재생하고 있습니다.",
    }),
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).not.toBeInTheDocument();
});

it("스트림 완료 후 다시 듣기와 WAV 다운로드를 활성화한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "완료할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });

  const replayButton = screen.getByRole("button", { name: "다시 듣기" });
  await waitFor(() => expect(replayButton).toBeEnabled());
  expect(
    screen.getByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).toHaveAttribute("href", "blob:test-audio");
  expect(
    screen.getByRole("heading", {
      name: "음성 생성이 완료되었습니다.",
    }),
  ).toBeInTheDocument();
});

it("상태 라이브 영역을 유지하며 생성 상태 문구만 갱신한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  const liveStatus = screen.getByRole("status");
  expect(liveStatus).toBeEmptyDOMElement();

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "상태를 알릴 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  expect(liveStatus).toHaveTextContent(
    "음성을 생성하며 재생하고 있습니다.",
  );
});

it("완료된 음성을 다시 듣기 버튼으로 처음부터 재생한다", async () => {
  const playAudio = vi
    .spyOn(HTMLMediaElement.prototype, "play")
    .mockResolvedValue();
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "다시 들을 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });

  const replayButton = screen.getByRole("button", {
    name: "다시 듣기",
  });
  await waitFor(() => expect(replayButton).toBeEnabled());
  const completedAudio = document.querySelector("audio");
  expect(completedAudio).not.toBeNull();
  if (!completedAudio) throw new Error("완성된 오디오 요소가 없습니다.");
  completedAudio.currentTime = 12;

  await user.click(replayButton);

  expect(completedAudio.currentTime).toBe(0);
  expect(playAudio).toHaveBeenCalledOnce();
});

it("스트림 오류 시 결과를 폐기하고 생성 버튼을 복구한다", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "중단될 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
  act(() => streamController.enqueue(Uint8Array.from([0, 0])));
  await waitFor(() => expect(player.enqueue).toHaveBeenCalledOnce());
  act(() => errorStream(new Error("연결 끊김")));

  expect(await screen.findByRole("alert")).toHaveTextContent("연결 끊김");
  expect(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  ).toBeEnabled();
  expect(
    screen.queryByRole("button", { name: "다시 듣기" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).not.toBeInTheDocument();
  expect(createObjectUrl).not.toHaveBeenCalled();
  expect(requestSignal?.aborted).toBe(true);
  expect(player.close).toHaveBeenCalledOnce();
});

it("새 생성 전 이전 요청과 플레이어 및 Blob URL을 정리한다", async () => {
  createObjectUrl
    .mockReturnValueOnce("blob:first-audio")
    .mockReturnValueOnce("blob:second-audio");
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "첫 번째 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  const fetchMock = vi.mocked(fetch);
  const firstSignal = fetchMock.mock.calls[0]?.[1]?.signal;
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });
  expect(
    await screen.findByRole("link", {
      name: "생성된 음성 파일 다운로드",
    }),
  ).toHaveAttribute("href", "blob:first-audio");

  let secondController!: ReadableStreamDefaultController<Uint8Array>;
  const secondStream = new ReadableStream<Uint8Array>({
    start(controller) {
      secondController = controller;
    },
  });
  fetchMock.mockResolvedValueOnce(new Response(secondStream));
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  expect(firstSignal).toBeInstanceOf(AbortSignal);
  expect(firstSignal?.aborted).toBe(true);
  expect(player.close).toHaveBeenCalledOnce();
  expect(revokeObjectUrl).toHaveBeenCalledWith("blob:first-audio");
  expect(
    screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "다시 듣기" })).toBeDisabled();

  act(() => {
    secondController.enqueue(Uint8Array.from([1, 0]));
    secondController.close();
  });
  expect(
    await screen.findByRole("link", {
      name: "생성된 음성 파일 다운로드",
    }),
  ).toHaveAttribute("href", "blob:second-audio");
});

it("언마운트 시 요청과 플레이어 및 Blob URL을 정리한다", async () => {
  const user = userEvent.setup();
  const { unmount } = render(
    <StrictMode>
      <Home />
    </StrictMode>,
  );

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "정리할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });
  await screen.findByRole("link", {
    name: "생성된 음성 파일 다운로드",
  });

  unmount();

  expect(requestSignal).toBeInstanceOf(AbortSignal);
  expect(requestSignal?.aborted).toBe(true);
  expect(player.close).toHaveBeenCalledOnce();
  expect(revokeObjectUrl).toHaveBeenCalledWith("blob:test-audio");
});

it("언마운트 후 늦게 끝난 요청은 오디오 결과를 만들지 않는다", async () => {
  let resolveFetch!: (response: Response) => void;
  const delayedResponse = new Promise<Response>((resolve) => {
    resolveFetch = resolve;
  });
  vi.stubGlobal("fetch", vi.fn(() => delayedResponse));
  const user = userEvent.setup();
  const { unmount } = render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "늦게 끝날 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
  const requestSignal = vi.mocked(fetch).mock.calls[0]?.[1]?.signal;
  unmount();

  const delayedStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(Uint8Array.from([0, 0]));
      controller.close();
    },
  });
  await act(async () => {
    resolveFetch(new Response(delayedStream));
    await delayedResponse;
  });

  expect(requestSignal?.aborted).toBe(true);
  expect(player.create).not.toHaveBeenCalled();
  expect(player.enqueue).not.toHaveBeenCalled();
  expect(createObjectUrl).not.toHaveBeenCalled();
});
