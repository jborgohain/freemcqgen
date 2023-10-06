const form = document.getElementById("mcq-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const questionInput = document.getElementById("question");
    const optionsInput = document.getElementById("options");

    const question = questionInput.value;
    const options = optionsInput.value.split(",").map(option => option.trim());

    const mcqHTML = generateMCQ(question, options);
    await downloadAsPicture(mcqHTML);
});

function generateMCQ(question, options) {
    let mcqHTML = `
        <div class="mcq-container">
            <div class="question">${question}</div>
            <ul class="options">
    `;

    options.forEach((option, index) => {
        const alphabet = String.fromCharCode(65 + index);
        mcqHTML += `<li>${alphabet}. ${option}</li>`;
    });

    mcqHTML += `
            </ul>
        </div>
    `;

    return mcqHTML;
}

async function downloadAsPicture(content) {
    const mcqContainer = document.createElement("div");
    mcqContainer.innerHTML = content;
    mcqContainer.style.width = "1280px"; // Set the width to 1280 pixels
    mcqContainer.style.height = "720px"; // Set the height to 720 pixels


    document.body.appendChild(mcqContainer);

    try {
        const blob = await domtoimage.toBlob(mcqContainer);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "mcq.png";
        link.click();
    } catch (error) {
        console.error("Error creating image:", error);
    } 
    // finally {
    //     document.body.removeChild(mcqContainer);
    // }
}
