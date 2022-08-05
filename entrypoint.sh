#!/bin/bash

sequelize-cli db:create
sequelize-cli db:migrate
node ./index.js
