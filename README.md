# Introduction

This is example app for searching subcontractors. Following stack was utilized to build it: React, Redux, Typescript, Apollo, TypeGraphql, Nodejs, PostgresSQL.

# Getting Started

1. add your own connection url (PostgresSQL) to ormconfig.json and set "synchronize:true"
2. run "npm run dev" to initialize tables
3. stop app and set "synchronize:false" in ormconfig.json
4. run "ts-node ./node_modules/typeorm/cli.js migration:run" from root of your app to seed DB
5. npm run project:install
6. npm run dev
