export class TypedJava {
    private files: {name:string,code:string}[] = [];
    private outputEl: HTMLElement;
    private codeEl: HTMLTextAreaElement;
    private variables: Record<string, any> = {};

    constructor(codeElId: string, outputElId: string) {
        this.codeEl = document.getElementById(codeElId) as HTMLTextAreaElement;
        this.outputEl = document.getElementById(outputElId) as HTMLElement;
        const saved = localStorage.getItem('typedjava_files');
        if (saved) this.files = JSON.parse(saved);
    }

    saveFile(name: string) {
        const existing = this.files.find(f => f.name === name);
        if (existing) existing.code = this.codeEl.value;
        else this.files.push({name, code: this.codeEl.value});
        localStorage.setItem('typedjava_files', JSON.stringify(this.files));
        this.log(`File "${name}" saved.`);
    }

    loadFile(name: string) {
        const file = this.files.find(f => f.name === name);
        if (file) this.codeEl.value = file.code;
        this.log(file ? `File "${name}" loaded.` : `File "${name}" not found.`);
    }

    run() {
        const code = this.codeEl.value.split('\n');
        this.outputEl.innerHTML = '';
        this.variables = {};
        for (let line of code) this.execLine(line.trim());
    }

    private execLine(line: string) {
        if (line.length === 0 || line.startsWith('//')) return;

        if (line.startsWith('import ')) {
            this.log(`Import ignored in browser: ${line}`);
            return;
        }

        if (line.startsWith('System.out.println(') && line.endsWith(');')) {
            const content = line.slice(19,-2).trim();
            if (this.variables[content] !== undefined) this.log(this.variables[content]);
            else this.log(eval(content));
            return;
        }

        let varMatch = line.match(/(int|double|String)\s+(\w+)\s*=\s*(.+);/);
        if (varMatch) {
            const [, type, name, value] = varMatch;
            this.variables[name] = this.parseValue(type, value);
            return;
        }

        let assignMatch = line.match(/(\w+)\s*=\s*(.+);/);
        if (assignMatch) {
            const [, name, value] = assignMatch;
            if (this.variables[name] !== undefined) this.variables[name] = eval(value);
            return;
        }

        if (line.startsWith('if(') && line.endsWith(')')) {
            this.log(`If statement detected (not fully executed in this simple interpreter).`);
            return;
        }

        if (line.startsWith('for(') && line.endsWith(')')) {
            this.log(`For loop detected (not fully executed in this simple interpreter).`);
            return;
        }

        if (line.startsWith('while(') && line.endsWith(')')) {
            this.log(`While loop detected (not fully executed in this simple interpreter).`);
            return;
        }

        this.log(`Unsupported: ${line}`);
    }

    private parseValue(type: string, value: string) {
        if (type === 'int') return parseInt(value);
        if (type === 'double') return parseFloat(value);
        if (type === 'String') return value.replace(/^"|"$/g,'');
        return value;
    }

    private log(msg:any) {
        const p = document.createElement('p');
        p.textContent = String(msg);
        this.outputEl.appendChild(p);
    }
          }
