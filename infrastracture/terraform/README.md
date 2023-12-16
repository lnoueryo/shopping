## 概要
インフラ情報の文書化ができ、変更が管理しやすいため、GCPのリソースをTerraformで管理する。環境毎に分けており、stage・prodの階層でTerraformのプログラムを実行する。
```
terraform/
    ├ environments/
    │     ├ prod/
    │     └ stage/
    └ modules/
        └ gcp_services/
```
## 環境構築
### Windows
#### インストール
1. Windows用のインストールファイルを[ダウンロード](https://developer.hashicorp.com/terraform/install)
2. ダウンロードしたファイルを開いてインストール
#### アップグレード
管理者で下記コマンドを実行
```
$ choco upgrade terraform
```
### インストール後
stage・prodに**terraform.tfvars**を作成し、環境変数を記述。環境変数の値は別途管理している。
Terraformプロジェクトの初期化を行う。
```
$ terraform init
```
## 環境変数
```
gcp_project: GCPのプロジェクトID
gcp_region: GCPのリージョン
bff_name: Frontend用のCloud Runのサービス名
bff_memory: Frontend用のCloud Runのメモリサイズ
bff_cpu: Frontend用のCloud RunのCPU数
rakuten_app_id: Frontend用のCloud Runの環境変数→楽天APIのAPIキー
rakuten_api_endpoint: Frontend用のCloud Runの環境変数→楽天BooksAPIのエンドポイント
```
## 基本コマンド

変更のプレビューを表示する。
```
$ terraform plan
```
実際にインフラストラクチャの変更を適用する。
```
$ terraform apply
```