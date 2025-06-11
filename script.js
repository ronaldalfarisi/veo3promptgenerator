document.addEventListener('DOMContentLoaded', () => {
    const cameraMovements = {
        // Common movements
        "Static": "Statis",
        "Pan Left": "Geser Kiri",
        "Pan Right": "Geser Kanan",
        "Tilt Up": "Miring ke Atas",
        "Tilt Down": "Miring ke Bawah",
        "Dolly In": "Maju",
        "Dolly Out": "Mundur",
        "Zoom In": "Perbesar",
        "Zoom Out": "Perkecil",
        "Tracking Shot": "Tembakan Pelacakan",
        "Crane Shot": "Tembakan Derek",
        "Handheld": "Genggam",
        // Higgsfield.ai motions
        "3D Rotation (Rotasi 3D)": "3D Rotation",
        "3D Rotation Y-axis (Rotasi 3D sumbu Y)": "3D Rotation Y-axis",
        "3D Rotation Z-axis (Rotasi 3D sumbu Z)": "3D Rotation Z-axis",
        "Arc (Busur)": "Arc",
        "Boom (Ledakan)": "Boom",
        "Circle (Lingkaran)": "Circle",
        "Clockwise (Searah Jarum Jam)": "Clockwise",
        "Counter-Clockwise (Berlawanan Jarum Jam)": "Counter-Clockwise",
        "Crane down (Derek turun)": "Crane down",
        "Crane up (Derek naik)": "Crane up",
        "Dolly (Doli)": "Dolly",
        "Drone (Dron)": "Drone",
        "Following (Mengikuti)": "Following",
        "Forward (Maju)": "Forward",
        "Horizontal (Horizontal)": "Horizontal",
        "Jib (Jib)": "Jib",
        "Low angle (Sudut rendah)": "Low angle",
        "Orbit (Orbit)": "Orbit",
        "Pan (Geser)": "Pan",
        "Pedestal (Alas)": "Pedestal",
        "Point of View (Sudut Pandang)": "Point of View",
        "Pull-out (Tarik keluar)": "Pull-out",
        "Pull-push (Tarik-dorong)": "Pull-push",
        "Push-in (Dorong masuk)": "Push-in",
        "Reverse (Mundur)": "Reverse",
        "Rotate (Putar)": "Rotate",
        "Side (Samping)": "Side",
        "Spin (Berputar)": "Spin",
        "Steadycam (Steadycam)": "Steadycam",
        "Tilt (Miring)": "Tilt",
        "Time-lapse (Selang Waktu)": "Time-lapse",
        "Tracking (Pelacakan)": "Tracking",
        "Travelling (Perjalanan)": "Travelling",
        "Truck (Truk)": "Truck",
        "Vertical (Vertikal)": "Vertical",
        "Whip pan (Geser cepat)": "Whip pan",
        "Yaw (Oleng)": "Yaw",
        "Zoom (Perbesar/Perkecil)": "Zoom"
    };

    const cameraSelect = document.getElementById('gerakan-kamera');
    for (const [name, value] of Object.entries(cameraMovements)) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = name;
        cameraSelect.appendChild(option);
    }

    document.getElementById('generate-btn').addEventListener('click', () => {
        const getVal = (id) => document.getElementById(id).value.trim();
        const getSelectText = (id) => {
            const select = document.getElementById(id);
            return select.options[select.selectedIndex].text;
        };

        const judulScene = getVal('judul-scene');
        const deskripsiKarakter = getVal('deskripsi-karakter');
        const suaraKarakter = getVal('suara-karakter');
        const aksiKarakter = getVal('aksi-karakter');
        const ekspresiKarakter = getVal('ekspresi-karakter');
        const latarTempatWaktu = getVal('latar-tempat-waktu');
        const gerakanKameraValue = document.getElementById('gerakan-kamera').value;
        const gerakanKameraText = getSelectText('gerakan-kamera');
        const detailVisualTambahan = getVal('detail-visual-tambahan');
        const suasanaKeseluruhan = getVal('suasana-keseluruhan');
        const suaraLingkungan = getVal('suara-lingkungan');
        const dialogKarakter = getVal('dialog-karakter');
        const negativePrompt = getVal('negative-prompt');

        // --- Indonesian Prompt (Developed) ---
        let promptIndonesia = `Sebuah video sinematik dengan judul scene "${judulScene}".\n\n`;
        promptIndonesia += `**Karakter Utama:**\n${deskripsiKarakter}\n\n`;
        promptIndonesia += `Karakter ini ${aksiKarakter}, menampilkan ekspresi ${ekspresiKarakter}. \n\n`;
        promptIndonesia += `**Latar:**\nVideo ini berlatar di ${latarTempatWaktu}. Suasana keseluruhan terasa ${suasanaKeseluruhan}.\n\n`;
        promptIndonesia += `**Audio:**\n${suaraKarakter}. Dialog yang diucapkan adalah: "${dialogKarakter}". Suara lingkungan yang mendukung adalah ${suaraLingkungan}.\n\n`;
        promptIndonesia += `**Visual:**\nMenggunakan gerakan kamera ${gerakanKameraText}. ${detailVisualTambahan}.\n\n`;
        promptIndonesia += `**Hindari (Negative Prompt):**\n${negativePrompt}`;

        document.getElementById('output-indonesia').value = promptIndonesia;

        // --- English Prompt (Final) ---
        const translateDescription = (desc) => {
            // A real translation API would be better, but for now, we'll just re-format.
            return desc.replace(/Perawakan\/Bentuk Tubuh:/g, 'Physique/Body Shape:')
                       .replace(/warna kulit:/g, 'Skin color:')
                       .replace(/Rambut:/g, 'Hair:')
                       .replace(/Wajah:/g, 'Face:')
                       .replace(/Pakaian:/g, 'Clothing:');
        };
        
        const translateVoice = (voice) => {
            return voice.replace(/Nada:/g, 'Tone:')
                        .replace(/Timbre:/g, 'Timbre:')
                        .replace(/Aksen\/Logat:/g, 'Accent/Dialect:')
                        .replace(/Cara Berbicara:/g, 'Speaking Style:')
                        .replace(/PENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video./g, 'IMPORTANT: All dialogue must be in natural and clear Bahasa Indonesia. Ensure this character\'s voice is consistent throughout the video.');
        };

        let promptEnglish = `A cinematic video titled "${judulScene}".\n\n`;
        promptEnglish += `**Main Character:**\n${translateDescription(deskripsiKarakter)}\n\n`;
        promptEnglish += `The character is ${aksiKarakter}, showing an expression of ${ekspresiKarakter}.\n\n`;
        promptEnglish += `**Setting:**\nThe video is set at ${latarTempatWaktu}. The overall atmosphere feels ${suasanaKeseluruhan}.\n\n`;
        promptEnglish += `**Audio:**\n${translateVoice(suaraKarakter)}. The spoken dialogue is: "${dialogKarakter}". The supporting ambient sound is ${suaraLingkungan}.\n\n`;
        promptEnglish += `**Visuals:**\nUsing a ${gerakanKameraValue} camera movement. ${detailVisualTambahan}.\n\n`;
        promptEnglish += `**Avoid (Negative Prompt):**\n${negativePrompt}`;

        document.getElementById('output-english').value = promptEnglish;
    });
}); 