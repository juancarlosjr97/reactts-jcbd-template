#!/usr/bin/python

import os
import sys
import argparse
import yaml
import subprocess

if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        prog="deploy.py",
        description="CircleCI deployment with Python script",
        usage="%(prog)s [options]",
        formatter_class=argparse.RawTextHelpFormatter,
    )

    parser.add_argument("--site", help="site to deploy")
    parser.add_argument(
        "--repo", help="repository to deploy", default="unknown")
    parser.add_argument("--branch", help="branch to deploy", default="develop")

    args = parser.parse_args()

    server_username = os.getenv(
        "SERVER_USERNAME")
    server_ip = os.getenv("SERVER_IP")
    server_api_url = os.getenv("SERVER_API_URL")
    command_deployment = os.getenv(
        "COMMAND_DEPLOYMENT")

    site_config_file = "config/sites/{}.yml".format(args.site).lower()

    site_config = yaml.safe_load(open(site_config_file)) or {}

    with open(".env", "w") as file:

        file.write("REACT_APP_API_URL" + "=" + server_api_url + "\n")

        for key in site_config.keys():
            file.write("REACT_APP_" + key + "=" + site_config[key] + "\n")

        file.close()

    subprocess.call([
        "yarn",
        "install"
    ])

    subprocess.call([
        "yarn",
        "build:{}".format(command_deployment).lower()
    ])

    subprocess.call([
        "ssh",
        "-oStrictHostKeyChecking=no",
        "{}@{}".format(server_username, server_ip).lower(),
        "mkdir",
        "-p",
        "/project/{}/{}/{}".format(args.site, args.branch, args.repo).lower()
    ])

    subprocess.call([
        "rsync",
        "-avz",
        "./build/",
        "{}@{}:/project/{}/{}/{}".format(server_username, server_ip,
                                     args.site, args.branch, args.repo).lower(),
        "--delete"
    ])
