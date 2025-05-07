function greet(name, formatter) { //accepts another fn as arugument
    const formattedName = formatter(name);
    console.log("Hello, " + formattedName + "!");
  }
  
 function toUpperCase(name) {
    return name.toUpperCase();
  }

  greetUser("alice", toUpperCase);//call greet & pass toUppercase as a callback
  