const display = document.getElementById("display");

const buttons = document.querySelectorAll(".buttons button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;
        console.log(value);
        switch (value) {

            case "Clear":
                display.value = "";
                break;
            case "DEL":   
                 display.value = display.value.slice(0, -1);
                 break;
            case "=":
                try {
                    display.value = eval(display.value);
                } catch {
                    display.value = "Error";
                }
                break;

            case "PER":
              display.value = parseFloat(display.value) / 100;
              break;

            case "sin":
                display.value=
                display.value = Math.sin(toRadians(display.value));
                break;

            case "cos":
                display.value = Math.cos(toRadians(display.value));
                break;

            case "tan":
                display.value = Math.tan(toRadians(display.value));
                break;

            case "log":
                display.value = Math.log10(display.value);
                break;

            case "sqrt":
                display.value = Math.sqrt(display.value);
                break;

            case "pow":
                display.value += "**";
                break;

            default:
                display.value += value;
        }
    });
});

function toRadians(degree) {
    return degree * (Math.PI / 180);
}