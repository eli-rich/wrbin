#!/bin/bash
cd back
go build -ldflags='-w -s' -o ../server .

