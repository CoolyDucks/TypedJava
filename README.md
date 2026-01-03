# 🖥️ TypedJava

**TypedJava** is a simple **Java interpreter for the browser**. It allows you to write and run small Java snippets directly on a webpage — perfect for wiki pages, tutorials, or educational demos! 📝

## ⚡ Features

- ✅ Run simple Java code in the browser without installing Java  
- ✅ Supports basic types: `int`, `double`, `String`  
- ✅ Supports `System.out.println` for output  
- ✅ Simple wiki-style integration — display code examples with a Run button  
- ✅ Save and load code snippets in **LocalStorage**  
- ✅ Lightweight and easy to embed in any HTML page  

## 💻 Example Usage

```html
<pre id="codeArea">
int a = 5;
int b = 10;
System.out.println("Sum: " + (a+b));
</pre>

<div id="output"></div>
<button id="runBtn">Run Example</button>

<script type="module">
import { WikiJava } from './TypedJava.ts';
const app = new WikiJava('codeArea','output');
document.getElementById('runBtn').onclick = () => app.run();
</script>

# Why 🧐

- TypedJava is a Project to run Java on Browser Used TypeScript for Programming it and you don't need any thing to run & it is an Interpreter


# LICENCE 🌝

- Mozilla 1.0


# Tell me About it! 🌜

- Coolyducks@proton.me
