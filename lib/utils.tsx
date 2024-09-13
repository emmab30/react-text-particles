export const calculateMaxFontSize = (text: string, font: string, containerWidth: number, containerHeight: number) => {
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    let fontSize = 200; // Comenzamos con un tamaño de fuente grande
    ctx.font = `${fontSize}px ${font}`;

    const lines = text.split("\n");
    let maxLineWidth = 0;
    let textHeight = 0;

    // Función para calcular las dimensiones del texto
    const calculateTextDimensions = () => {
        maxLineWidth = 0;
        textHeight = fontSize * lines.length * 1.2; // 1.2 es el espaciado entre líneas
        lines.forEach((line) => {
            const lineWidth = ctx.measureText(line).width;
            if (lineWidth > maxLineWidth) maxLineWidth = lineWidth;
        });
    };

    calculateTextDimensions();

    // Reducir el tamaño de la fuente hasta que el texto quepa en el contenedor
    while (maxLineWidth > containerWidth - 20 || textHeight > containerHeight - 20) {
        fontSize -= 1;
        ctx.font = `${fontSize}px ${font}`;
        calculateTextDimensions();
    }

    return fontSize;
};

export const getTextPoints = (text: string, font: string, fontSize: number, containerWidth: number, containerHeight: number) => {
    if (typeof window !== "undefined") {
        const canvas = document.createElement("canvas");
        const ctx: any = canvas.getContext("2d");
        ctx.font = `${fontSize}px ${font}`;

        const lines = text.split("\n");
        const lineHeight = fontSize * 1.2;
        const textHeight = lineHeight * lines.length;
        let maxLineWidth = 0;
        lines.forEach((line) => {
            const lineWidth = ctx.measureText(line).width;
            if (lineWidth > maxLineWidth) maxLineWidth = lineWidth;
        });

        canvas.width = containerWidth;
        canvas.height = containerHeight;

        ctx.fillStyle = "white";
        ctx.font = `${fontSize}px ${font}`;

        const xOffset = (containerWidth - maxLineWidth) / 2;
        const yOffset = (containerHeight - textHeight) / 2;

        // Renderizar cada línea de texto
        lines.forEach((line, index) => {
            const lineWidth = ctx.measureText(line).width;
            const lineXOffset = (containerWidth - lineWidth) / 2; // Centrar cada línea horizontalmente
            ctx.fillText(line, lineXOffset, yOffset + fontSize + lineHeight * index);
        });

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const points = [];

        // Extraer posiciones donde hay píxeles no transparentes
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const index = (y * canvas.width + x) * 4;
                const alpha = imageData.data[index + 3];
                if (alpha > 0) {
                    // Detect which line is this pixel
                    const line = Math.floor(y / lineHeight);
                    points.push({ x, y, line });
                }
            }
        }

        return points;
    }

    return [];
};
