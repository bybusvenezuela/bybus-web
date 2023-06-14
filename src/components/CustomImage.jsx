import React, { useState, useEffect } from 'react'
import { Storage } from 'aws-amplify'
import { useImage } from '@/hooks'
import Image from "next/image";
const CustomImage = ({ path, alt = "", width, height, styled = {} }) => {
    const { getUploadedImage } = useImage();
    const [image, setImage] = useState(null)

    const getImage = async () => {
        console.log("PATH: ", path)
        const url = await getUploadedImage(path);
        setImage(url)
    }

    useEffect(() => {
        getImage();
    }, [path])

    if (!image) {
        return <div>Cargando imagen...</div>
    }
    return (
        <Image
            src={image}
            width={width}
            height={height}
            alt={alt}
        />
    )
}

export default CustomImage