# Git Profile Viewer CLI

Git Profile Viewer CLI is a command-line interface (CLI) application designed to facilitate the viewing of GitHub profiles and associated information.

## Installation

Ensure you have Node.js installed on your machine.

1. Clone the repository:

   ```bash
   git clone https://github.com/3BIK8/git-profile-viewer-cli.git
   ```

## Usage/Examples

```bash
node index.js <command> <username>
```

### Commands:

- **view (v):** View GitHub profile information.

  ```bash
  node index.js view <username>
  ```

- **repos (r):** View GitHub repositories.

  ```bash
  node index.js repos <username>
  ```

- **followers (f):** View GitHub followers.

  ```bash
  node index.js followers <username>
  ```

- **following (g):** View users followed by a GitHub user.

  ```bash
  node index.js following <username>
  ```

- **starred (s):** View starred repositories of a GitHub user.

  ```bash
  node index.js starred <username>
  ```

### Example

```bash
node index.js view 3BIK8
```
