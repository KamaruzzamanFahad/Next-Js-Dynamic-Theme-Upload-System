import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), "uploads");
        console.log("Upload directory:", uploadDir);  // লগ দিন
        if (!fs.existsSync(uploadDir)) {
            console.log("Creating upload folder...");
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + path.extname(file.originalname);
        console.log("Saving file as:", fileName);  // লগ দিন
        cb(null, fileName); 
    }
});


export async function POST(request) {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const byte = await file.arrayBuffer();
    const buffer = Buffer.from(byte);

    const uploadPath = path.join(process.cwd(), "src/components", file.name);

    fs.writeFile(uploadPath, buffer, (err) => {
        if (err) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    });
    console.log("File uploaded successfully", uploadPath);

    return NextResponse.json({ message: "File uploaded successfully" });

}
