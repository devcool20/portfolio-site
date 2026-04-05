# Google Stitch — local MCP server

This folder contains a **stdio MCP server** that forwards JSON-RPC to Google’s Stitch endpoint:

`https://stitch.googleapis.com/mcp`

It is based on the open-source [`stitch-mcp`](https://www.npmjs.com/package/stitch-mcp) behavior (Apache-2.0), with an extra authentication mode:

- **API key** — set `STITCH_API_KEY` or `GOOGLE_API_KEY` (sent as `X-Goog-Api-Key`).
- **Application Default Credentials** — if no API key is set, the server uses `gcloud auth application-default print-access-token` (Bearer token), same as the upstream package.

## Security

- **Never commit API keys.** Add the key only in Cursor’s MCP environment UI or your OS user environment.
- If a key was pasted into chat or committed, **rotate it** in Google Cloud / Stitch settings.

## Prerequisites

1. A **Google Cloud project ID** that has Stitch enabled for your account.
2. Set one of:
   - `GOOGLE_CLOUD_PROJECT` or `STITCH_PROJECT_ID`
3. Authentication (pick one):
   - `STITCH_API_KEY` = your Stitch / Google API key, **or**
   - `gcloud` installed and `gcloud auth application-default login` completed.

Some Stitch operations may require OAuth / ADC even if discovery works with an API key. If tool calls fail with an auth error, switch to ADC.

## Install dependencies

From the repo root:

```bash
cd mcp-servers/stitch
npm install
```

## Cursor / MCP config

In your project `.mcp.json` (or Cursor MCP settings), point `command` at this server and pass **env vars in the UI**, not in the file:

```json
{
  "mcpServers": {
    "stitch": {
      "command": "node",
      "args": ["./mcp-servers/stitch/index.js"],
      "env": {
        "GOOGLE_CLOUD_PROJECT": "your-gcp-project-id"
      }
    }
  }
}
```

Add `STITCH_API_KEY` in Cursor’s secret env for MCP (recommended), not in the JSON file.

## License

The original upstream implementation is Apache-2.0. This derivative keeps the same overall structure; see `NOTICE` in this folder.
