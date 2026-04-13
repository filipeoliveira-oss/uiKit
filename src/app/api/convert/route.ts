// app/api/convert/route.ts

import { NextRequest } from "next/server";
import sharp from "sharp";
import pngToIco from "png-to-ico";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const format = (formData.get("format") as string).toLowerCase();

    if (!file) {
        return new Response("No file", { status: 400 });
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer());

    try {
        let pipeline = sharp(inputBuffer);

        // 🔥 aqui você pode evoluir depois (resize, compressão, etc)
        switch (format) {
            case "png":
                pipeline = pipeline.png();
                break;

            case "jpg":
            case "jpeg":
                pipeline = pipeline.jpeg({ quality: 90 });
                break;

            case "webp":
                pipeline = pipeline.webp({ quality: 90 });
                break;

            case "avif":
                pipeline = pipeline.avif({ quality: 50 });
                break;

            case "tiff":
                pipeline = pipeline.tiff();
                break;

            case "ico":
                const pngBuffer = await sharp(inputBuffer)
                    .resize(256, 256)
                    .png()
                    .toBuffer();
                const icoBuffer = await pngToIco([pngBuffer]);
                return new Response(new Uint8Array(icoBuffer), {
                    headers: { "Content-Type": "image/x-icon" },
                });
            default:
                return new Response("Formato não suportado", { status: 400 });
        }

        const outputBuffer = await pipeline.toBuffer();

        return new Response(new Uint8Array(outputBuffer), {
            headers: {
                "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
            },
        });
    } catch (err) {
        return new Response("Erro na conversão", { status: 500 });
    }
}
