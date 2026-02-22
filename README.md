# MIRROR-API

A simple API that mirrors the request back to the client, intended for (but, not limited to) debugging purposes.

---

## Usage

 - [Native Deployment](Deployment/native)
 - [Container](Deployment/container)
 - [Kubernetes Deployment](Deployment/kubernetes)
 - [Helm Chart](Deployment/helm)

---

## Environment Variables

The Application itself comes with a default, ready to use configuration, baked into the application, but allows extended debugging capabilities with environment variables.

| S.No. | Env Keys   | Default Value | Description |
|-------|------------|---------------|-------------|
| 1.    | `PORT`     | `8000`        | The port to listen on. |
| 2.    | `APP_NAME` | -             | Sample Name for the API. Intended for env debugging. |

---

