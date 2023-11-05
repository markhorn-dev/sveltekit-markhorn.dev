---
title: Hash Tables in Golang
description: Hash Table data structures provide lightning fast access to values based on keys. In this post, let's explore how to create a hash table (hash map) in Golang.
datePublished: 10/1/2023
tags: [ Golang, Data Structures, Algorithms ]
---
## Introduction

Hash tables, also known as hash maps, are fundamental data structures in computer science used to implement associative arrays and dictionaries. These data structures provide fast access to values based on their keys. In this blog post, we'll explore how to create a hash table in Golang, a statically typed, compiled language known for its efficiency and simplicity.

## Understanding Hash Tables

A hash table consists of an array of buckets, each capable of storing key-value pairs. The magic happens in the hash function, which converts the key into an index within the array. This index determines the bucket where the key-value pair will be stored.

### Step 1: Define the Hash Table Structure

In Golang, defining a hash table involves creating a struct to represent the key-value pairs and an array (or slice) of buckets. Here's a basic example:

```go
type Node struct {
    Key   string
    Value interface{}
    Next  *Node
}

type HashTable struct {
    Buckets []Node
    Size    int
}
```

### Step 2: Implement the Hash Function

The hash function is crucial as it determines the index where the key-value pair will be stored. Golang provides a built-in `hash/fnv` package for hashing. Here's an example hash function:

```go
import (
    "hash/fnv"
)

func hashFunction(key string, size int) int {
    hasher := fnv.New32a()
    hasher.Write([]byte(key))
    return int(hasher.Sum32()) % size
}
```

### Step 3: Implement Basic Hash Table Operations

#### Insertion:

```go
func (ht *HashTable) Insert(key string, value interface{}) {
    index := hashFunction(key, ht.Size)
    newNode := Node{Key: key, Value: value}
    ht.Buckets[index].Next = &newNode
}
```

#### Search:

```go
func (ht *HashTable) Search(key string) (interface{}, bool) {
    index := hashFunction(key, ht.Size)
    currentNode := ht.Buckets[index].Next

    for currentNode != nil {
        if currentNode.Key == key {
            return currentNode.Value, true
        }
        currentNode = currentNode.Next
    }

    return nil, false
}
```

#### Deletion:

```go
func (ht *HashTable) Delete(key string) bool {
    index := hashFunction(key, ht.Size)
    currentNode := &ht.Buckets[index]

    for currentNode.Next != nil {
        if currentNode.Next.Key == key {
            currentNode.Next = currentNode.Next.Next
            return true
        }
        currentNode = currentNode.Next
    }

    return false
}
```

## Conclusion

Creating a hash table in Golang involves defining a structure, implementing a hash function, and performing basic operations like insertion, search, and deletion. Understanding these fundamental concepts empowers you to work with more complex data structures and solve various computational problems efficiently. Experiment with different hash functions and explore more advanced features to deepen your understanding of hash tables and their applications in software development. Happy coding!