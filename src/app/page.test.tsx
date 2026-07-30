import "@testing-library/jest-dom/vitest";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import Home from "./page";

const player = vi.hoisted(() => ({
  activate: vi.fn<() => Promise<void>>(),
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

    activate() {
      return player.activate();
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
  player.activate.mockResolvedValue();
  player.enqueue.mockResolvedValue();
  vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
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

it("본문 입력과 태그 추가를 1,000자에서 원천 차단한다", async () => {
  const user = userEvent.setup();
  render(<Home />);
  const textInput = screen.getByLabelText(
    "음성으로 변환할 텍스트 입력창",
  );

  expect(textInput).toHaveAttribute("maxLength", "1000");
  fireEvent.change(textInput, { target: { value: "가".repeat(1001) } });
  expect(textInput).toHaveValue("가".repeat(1000));

  await user.click(screen.getByRole("button", { name: "웃음 태그 추가" }));
  expect(textInput).toHaveValue("가".repeat(1000));
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

it("네트워크 요청 전에 스트리밍 플레이어 활성화를 완료한다", async () => {
  let completeActivation!: () => void;
  player.activate.mockReturnValueOnce(
    new Promise<void>((resolve) => {
      completeActivation = resolve;
    }),
  );
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "먼저 활성화할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  await waitFor(() => expect(player.activate).toHaveBeenCalledOnce());
  expect(fetch).not.toHaveBeenCalled();

  completeActivation();
  await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
});

it("플레이어 활성화가 거부되면 요청을 중단하고 한국어 오류를 알린다", async () => {
  player.activate.mockRejectedValueOnce(new Error("autoplay denied"));
  const abortRequest = vi.spyOn(AbortController.prototype, "abort");
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "차단될 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "오디오 자동 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인한 뒤 다시 시도해 주세요.",
  );
  expect(fetch).not.toHaveBeenCalled();
  expect(abortRequest).toHaveBeenCalledOnce();
  expect(player.close).toHaveBeenCalledOnce();
  expect(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  ).toBeEnabled();
});

it("플레이어 활성화가 동기 실패해도 한국어 오류로 정규화한다", async () => {
  player.activate.mockImplementationOnce(() => {
    throw new Error("AudioContext constructor failed");
  });
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "동기 실패할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "오디오 자동 재생을 시작하지 못했습니다. 브라우저의 자동 재생 권한을 확인한 뒤 다시 시도해 주세요.",
  );
  expect(fetch).not.toHaveBeenCalled();
  expect(player.close).toHaveBeenCalledOnce();
});

it("비JSON 오류 응답 본문을 한 번만 읽고 한국어 안내로 복구한다", async () => {
  const errorResponse = new Response("upstream temporarily unavailable", {
    status: 502,
    headers: { "Content-Type": "text/plain" },
  });
  const readText = vi.spyOn(errorResponse, "text");
  const readJson = vi.spyOn(errorResponse, "json");
  vi.mocked(fetch).mockResolvedValueOnce(errorResponse);
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "서버 오류를 확인할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "음성 생성 서버에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요. (서버 응답: upstream temporarily unavailable)",
  );
  expect(readText).toHaveBeenCalledOnce();
  expect(readJson).not.toHaveBeenCalled();
  expect(errorResponse.bodyUsed).toBe(true);
  expect(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  ).toBeEnabled();
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
  const wavBlob = createObjectUrl.mock.calls[0]?.[0];
  expect(wavBlob).toBeInstanceOf(Blob);
  if (!wavBlob) throw new Error("완성된 WAV Blob이 없습니다.");
  expect(wavBlob).toMatchObject({ size: 46, type: "audio/wav" });
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
    "음성을 생성하고 있습니다. 준비되면 자동 재생됩니다.",
  );

  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
  });

  await waitFor(() =>
    expect(liveStatus).toHaveTextContent(
      "음성을 생성하며 재생하고 있습니다.",
    ),
  );
});

it("예약 재생을 닫은 뒤 완성 음성을 처음부터 다시 재생한다", async () => {
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
  let finishPlayerClose!: () => void;
  player.close.mockReturnValueOnce(
    new Promise<void>((resolve) => {
      finishPlayerClose = resolve;
    }),
  );

  await user.click(replayButton);
  await user.click(replayButton);

  expect(player.close).toHaveBeenCalledOnce();
  expect(player.create).toHaveBeenCalledTimes(2);
  expect(player.activate).toHaveBeenCalledTimes(2);
  expect(player.enqueue).toHaveBeenCalledOnce();

  finishPlayerClose();
  await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));
  expect(player.enqueue).toHaveBeenLastCalledWith(Int16Array.from([0]));
  expect(document.querySelector("audio")).toBeNull();

  await user.click(replayButton);

  await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(3));
  expect(player.close).toHaveBeenCalledTimes(2);
  expect(player.create).toHaveBeenCalledTimes(3);
});

it("이전 다시 듣기의 늦은 실패가 새 결과를 막거나 오염하지 않는다", async () => {
  let rejectPreviousReplay!: (error: Error) => void;
  const previousReplayPlayback = new Promise<void>((_resolve, reject) => {
    rejectPreviousReplay = reject;
  });
  player.enqueue
    .mockResolvedValueOnce()
    .mockReturnValueOnce(previousReplayPlayback)
    .mockResolvedValue();
  vi.spyOn(console, "error").mockImplementation(() => {});
  createObjectUrl
    .mockReturnValueOnce("blob:previous-audio")
    .mockReturnValueOnce("blob:current-audio");
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "이전 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });
  const previousReplay = screen.getByRole("button", { name: "다시 듣기" });
  await waitFor(() => expect(previousReplay).toBeEnabled());
  await user.click(previousReplay);
  await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));

  let currentController!: ReadableStreamDefaultController<Uint8Array>;
  const currentStream = new ReadableStream<Uint8Array>({
    start(controller) {
      currentController = controller;
    },
  });
  vi.mocked(fetch).mockResolvedValueOnce(new Response(currentStream));
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    currentController.enqueue(Uint8Array.from([1, 0]));
    currentController.close();
  });
  const currentReplay = screen.getByRole("button", { name: "다시 듣기" });
  await waitFor(() => expect(currentReplay).toBeEnabled());

  await user.click(currentReplay);
  await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(4));

  await act(async () => {
    rejectPreviousReplay(new Error("이전 Web Audio 재생 실패"));
    await Promise.resolve();
  });

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).toHaveAttribute("href", "blob:current-audio");
});

it("새 생성을 시작하면 재생 중인 완성 오디오를 중지한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "재생 중인 음성",
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
  await user.click(replayButton);
  await waitFor(() => expect(player.enqueue).toHaveBeenCalledTimes(2));
  player.close.mockClear();

  let nextController!: ReadableStreamDefaultController<Uint8Array>;
  const nextStream = new ReadableStream<Uint8Array>({
    start(controller) {
      nextController = controller;
    },
  });
  vi.mocked(fetch).mockResolvedValueOnce(new Response(nextStream));
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  await waitFor(() => expect(player.close).toHaveBeenCalledOnce());
  expect(document.querySelector("audio")).toBeNull();

  act(() => {
    nextController.enqueue(Uint8Array.from([0, 0]));
    nextController.close();
  });
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: "다시 듣기" }),
    ).toBeEnabled(),
  );
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

it("유효 샘플 뒤 홀수 PCM 꼬리가 남으면 WAV 결과를 만들지 않는다", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "잘린 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0x00, 0x80, 0xff]));
    closeStream();
  });

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "PCM 오디오 데이터가 16비트 샘플 경계로 끝나지 않았습니다. 음성을 다시 생성해 주세요.",
  );
  expect(createObjectUrl).not.toHaveBeenCalled();
  expect(player.close).toHaveBeenCalledOnce();
  expect(
    screen.queryByRole("button", { name: "다시 듣기" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  ).toBeEnabled();
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
  let finishPreviousPlayerClose!: () => void;
  player.close.mockReturnValueOnce(
    new Promise<void>((resolve) => {
      finishPreviousPlayerClose = resolve;
    }),
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  await waitFor(() => expect(player.close).toHaveBeenCalledOnce());
  expect(player.activate).toHaveBeenCalledTimes(2);
  expect(fetchMock).toHaveBeenCalledOnce();

  finishPreviousPlayerClose();
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

it("새 생성 전 이전 플레이어 종료가 실패하면 새 요청을 막고 복구한다", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const abortRequest = vi.spyOn(AbortController.prototype, "abort");
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "이전 플레이어가 남은 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });
  await screen.findByRole("link", {
    name: "생성된 음성 파일 다운로드",
  });

  vi.mocked(fetch).mockClear();
  player.activate.mockClear();
  player.close.mockClear();
  player.create.mockClear();
  abortRequest.mockClear();
  player.close
    .mockRejectedValueOnce(new Error("AudioContext close failed"))
    .mockResolvedValueOnce();

  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "이전 오디오 재생을 종료하지 못했습니다. 새 음성을 생성하지 않았습니다. 잠시 후 다시 시도해 주세요.",
  );
  expect(player.create).toHaveBeenCalledOnce();
  expect(player.activate).toHaveBeenCalledOnce();
  expect(player.close).toHaveBeenCalledTimes(2);
  expect(player.activate.mock.invocationCallOrder[0]).toBeLessThan(
    player.close.mock.invocationCallOrder[0],
  );
  expect(fetch).not.toHaveBeenCalled();
  expect(abortRequest).toHaveBeenCalledTimes(2);
  expect(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  ).toBeEnabled();
  expect(
    screen.queryByRole("link", { name: "생성된 음성 파일 다운로드" }),
  ).not.toBeInTheDocument();
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
  expect(document.querySelector("audio")).toBeNull();
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
  expect(player.create).toHaveBeenCalledOnce();
  expect(player.close).toHaveBeenCalledOnce();
  expect(player.enqueue).not.toHaveBeenCalled();
  expect(createObjectUrl).not.toHaveBeenCalled();
});

it("영문 네트워크 오류를 친절한 한국어 안내로 정규화한다", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "네트워크 오류를 확인할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );

  act(() => errorStream(new TypeError("Failed to fetch")));

  expect(await screen.findByRole("alert")).toHaveTextContent(
    "음성 생성 중 연결이 끊어졌습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.",
  );
  expect(screen.getByRole("alert")).not.toHaveTextContent("Failed to fetch");
});

it("생성 당시 음성과 시각을 다운로드 파일명에 고정한다", async () => {
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "파일명을 확인할 음성",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });

  const download = await screen.findByRole("link", {
    name: "생성된 음성 파일 다운로드",
  });
  const originalName = download.getAttribute("download");
  expect(originalName).toMatch(
    /^gemini_tts_Puck_\d{6}_\d{6}\.wav$/,
  );

  await user.selectOptions(
    screen.getByLabelText("음성 선택"),
    "Aoede",
  );
  expect(download).toHaveAttribute("download", originalName);
});

it("스트림 reader를 정상 완료 후 해제하고 오류 시 취소한다", async () => {
  const cancelReader = vi.spyOn(
    ReadableStreamDefaultReader.prototype,
    "cancel",
  );
  const releaseReader = vi.spyOn(
    ReadableStreamDefaultReader.prototype,
    "releaseLock",
  );
  vi.spyOn(console, "error").mockImplementation(() => {});
  const user = userEvent.setup();
  render(<Home />);

  await user.type(
    screen.getByLabelText("음성으로 변환할 텍스트 입력창"),
    "reader 정리 성공",
  );
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => {
    streamController.enqueue(Uint8Array.from([0, 0]));
    closeStream();
  });
  await screen.findByRole("link", {
    name: "생성된 음성 파일 다운로드",
  });
  expect(releaseReader).toHaveBeenCalledOnce();
  expect(cancelReader).not.toHaveBeenCalled();

  let failingController!: ReadableStreamDefaultController<Uint8Array>;
  const failingStream = new ReadableStream<Uint8Array>({
    start(controller) {
      failingController = controller;
    },
  });
  vi.mocked(fetch).mockResolvedValueOnce(new Response(failingStream));
  await user.click(
    screen.getByRole("button", { name: "음성 생성하기 버튼" }),
  );
  act(() => failingController.error(new Error("stream failed")));
  await screen.findByRole("alert");

  expect(cancelReader).toHaveBeenCalledOnce();
  expect(releaseReader).toHaveBeenCalledTimes(2);
});
