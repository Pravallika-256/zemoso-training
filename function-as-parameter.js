function greet(name, formatter) {
    const formattedName  = formatter(name);
    console.log("Hello, "+formattedName + "!");
}

function toUpperCase(name) {
    return name.toUpperCase();
}

greetUser("alice", toUpperCase);