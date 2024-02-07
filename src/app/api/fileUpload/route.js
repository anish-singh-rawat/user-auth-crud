import {writeFile} from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server';

export async function POST (req){
    const data = await req.formData();
    const file = data.get('file');
    if(file){
        const byteData = await file.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const path = `./public/images/${file.name}`
        await writeFile(path, buffer)
        return NextResponse.json({
            message : "okay"
        })
    }
}
