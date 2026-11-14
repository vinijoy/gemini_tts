module.exports = {
    apps: [
        {
            name: "gemini-tts",
            cwd: __dirname,
            script: "node_modules/next/dist/bin/next",
            args: "start",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
