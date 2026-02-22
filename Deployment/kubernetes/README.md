# Kubernetes Deployment

To deploy the API on your kubernetes cluster, Refer to [manifest.yaml](https://github.com/thekarananand/Mirror-API/blob/main/Deployment/kubernetes/manifest.yaml). Feel free to make change as per your setup, or simply use the following script.

```sh
# Set Variables
export RAW_PATH="https://raw.githubusercontent.com/thekarananand/Mirror-API/refs/heads/main"

curl -s "${RAW_PATH}/Deployment/kubernetes/manifest.yaml" | kubectl apply -f -
```