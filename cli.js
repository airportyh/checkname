#! /usr/bin/env node

var request = require('request')
require('colors')

var name = process.argv[2]

if (!name){
  console.log('Usage: checkname <packagename>')
  process.exit(0)
}

request.get('http://registry.npmjs.org/' + name, function(err, resp, body){
  if (err){
    console.error(err)
    return
  }
  var doc = JSON.parse(body)
  if (doc.error === 'not_found'){
    console.log(name.cyan, 'is ' + 'available'.green + ' on NPM.')
  }else{
    console.log(name.cyan, 'has been ' + 'taken'.red + ' on NPM.')
  }
})

request.get('http://bower-component-list.herokuapp.com/', function(err, resp, body){
  if (err){
    console.error(err)
    return
  }
  var doc = JSON.parse(body)
  var found = doc.filter(function(package){
    return package.name === name
  })

  if (found.length === 0){
    console.log(name.cyan, 'is ' + 'available'.green + ' on Bower.')
  }else{
    console.log(name.cyan, 'has been ' + 'taken'.red + ' on Bower.')
  }
})