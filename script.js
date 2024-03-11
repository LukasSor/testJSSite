const lebensmittel = [ 
    {Produkt: "Milch", Groesse: "1l", Einkaufspreis: 0.8, Verkaufspreis: null, Anzahl: 1},  
    {Produkt: "Orangensaft", Groesse: "0,5l", Einkaufspreis: 1, Verkaufspreis: null, Anzahl: 6},  
    {Produkt: "Kaese", Groesse: "0,02kg", Einkaufspreis: 2, Verkaufspreis: null, Anzahl: 10}
];



// Funktion zum Austauschen der Elemente im Array
function austauschen(array, pos1, pos2) {
    // pos1 -= 1;
    // pos2 -= 1;

    if (pos1 >= 0 && pos1 < array.length && pos2 >= 0 && pos2 < array.length) {
        [array[pos1], array[pos2]] = [array[pos2], array[pos1]];
    } else {
        printOutput(`Bitte gültigen Index eingeben!`);
    }
    printOutput(array.join(``));
}

// Funktion zur Berechnung der Vereinigungsmenge von Arrays
function vereinigungsmenge(arrays) {
    printOutput([...new Set([].concat(...arrays).flat(Infinity))].sort((a, b) => a - b));
}

// Funktion zur Berechnung des Verkaufspreises für Lebensmittel
function berechneKaufpreis(array) {
    array.forEach((produkt) => {
        const preisaufschlag = 0.10; // Preisaufschlag
        const mwst = 0.20; // Mehrwertsteuer

        if (!isNaN(produkt.Verkaufspreis)) {
            produkt.Verkaufspreis = (produkt.Einkaufspreis + produkt.Einkaufspreis * preisaufschlag) * (1 + mwst);
        } else {
            produkt.Verkaufspreis = `${produkt.Einkaufspreis} + ${produkt.Einkaufspreis} * ${preisaufschlag} * ${1 + mwst}`;
        }
    });
}

// Funktion zum Hinzufügen von Lebensmitteln
function addLebensmittel() {
    const produkt = {
        Produkt: prompt("Geben Sie ein Produkt ein:"),
        Groesse: prompt("Geben Sie eine Grösse ein:"),
        Einkaufspreis: prompt("Geben Sie den Einkaufspreis ein:"),
        Anzahl: prompt("Geben Sie die Anzahl ein:")
    };
    lebensmittel.push(produkt); // Füge das neue Lebensmittel zum Array hinzu.
    printOutput(`Lebensmittel wurde hinzugefügt!`)
}

// Funktion zur Ausgabe der Lebensmittel
function ausgabeLebensmittel() {
    berechneKaufpreis(lebensmittel);

    const output = lebensmittel.map(item => {
        return `Lebensmittel: ${item.Produkt}, Größe: ${item.Groesse}, Einkaufspreis: ${item.Einkaufspreis}, Verkaufspreis: ${item.Verkaufspreis}, Anzahl: ${item.Anzahl}`;
    }).join('\n'); // Erstelle einen Text aus den Lebensmittelinformationen.

    printOutput(output);
}

// Funktion zur Überprüfung, ob ein Array ein Palindrom ist
function isPalindrom(array) {
    const copy = array.slice().reverse();

    for (let index in array) {
        if (array[index] !== copy[index]) {
            return(printOutput(`${array} ist kein Palindrom!`));
        }
    }
    printOutput(`${array} ist ein Palindrom!`);
}

// Funktion zur Ausführung von Berechnungen basierend auf einer Eingabe
function folge(array) {
    const operator = array.pop();
    let result = parseFloat(array.shift());

    array.forEach(function (value) {
        const numValue = parseFloat(value);
        switch (operator) {
            case '+':
                result = result + numValue;
                break;
            case '-':
                result = result - numValue;
                break;
            case '*':
                result = result * numValue;
                break;
            case '/':
                if (numValue !== 0) {
                    result = result / numValue;
                } else {
                    return(printOutput("Division durch Null ist nicht erlaubt."));
                }
                break;
            default:
                return(printOutput("Ungültiger Operator: " + operator));
        }
    });
    if (!isNaN(result)) { // Überprüft ob Eingabe Zahl ist
        printOutput("Ergebnis: " + result);
    } else {
        printOutput(`Bitte nur Zahlen und Operator eingeben!`);
    }
}



// Funktion zur Eingabe und Ausführung des Austauschens von Elementen
function inputAustauschen() {
    const array = prompt("Geben Sie einen Array (z.B. 1,2,3) ein:").split(',');
    const pos1 = parseFloat(prompt("Geben Sie die erste Zahl ein:"));
    const pos2 = parseFloat(prompt("Geben Sie die zweite Zahl ein:"));

    if (Array.isArray(array) && !isNaN(pos1) && !isNaN(pos2)) {
        austauschen(array, pos1, pos2);
    } else {
        printOutput("Ungültige Eingabe. Bitte geben Sie gültige Zahlen und einen Array ein.");
    }
}

// Funktion zur Eingabe und Ausführung der Vereinigungsmengenberechnung
function inputVereinigungsmenge() {
    const arrays = [];
    let add = true;

    while(add) {
        const input = prompt("Geben Sie einen Array (z.B. 1,2,3) ein oder drücken Sie Abbrechen zum Beenden:");
        
        if (input === null) {
            add = false;
        } else {
            arrays.push(input.split(','));
        }
    }
    vereinigungsmenge(arrays);
}

// Funktion zur Eingabe und Ausführung der Palindrom-Überprüfung
function inputIsPalindrom() {
    isPalindrom(prompt("Geben Sie einen Array (Palindrom) (z.B. 1,2,1) ein:").split(','));
}

// Funktion zur Eingabe und Ausführung von Berechnungen
function inputFolge() {
    folge(prompt("Geben Sie einen Array (z.B. 1,2,3) und einen Operator (z.B. *) ein:").split(','));
}



// Funktion zur Anzeige von Ausgabemeldungen
function printOutput(text) {
    const outputElement = document.getElementById("output");

    alert(text); // Zeige eine Benachrichtigung mit dem Text.
    if (outputElement) {
        outputElement.value += text + "\n\n"; // Schreibt Text in Textfeld
    }
}
