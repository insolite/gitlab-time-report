==================
GitLab Time Report
==================

GitLab report view for issues/members time tracking

Inspired by https://gitlab.com/gitlab-org/gitlab-ee/issues/1271

Setup development environment
=============================

#. Install `node` and `gulp`

#. Install dependencies

    .. code-block:: bash

        npm i

#. Build styles

    .. code-block:: bash

        gulp sass


#. Create GitLab personal access token with at least ``api`` access (more info on `GitLab Documentation page <https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html>`_)

#. Set up environment variables and start webpack dev server

    .. code-block:: bash

        GITLAB_URL="http://gitlab.localhost" \
        GITLAB_TOKEN="personal_access_token" \
        npm start


 - ``GITLAB_URL`` is the home page for your GitLab instance
 - ``GITLAB_TOKEN`` is an GitLab personal access token you got at previous step
 - ``LISTEN_HOST`` is ``localhost`` by default
 - ``LISTEN_PORT`` is ``3030`` by default

#. Open http://localhost:3030/ in browser (for default ``LISTEN_HOST`` and ``LISTEN_PORT``)
