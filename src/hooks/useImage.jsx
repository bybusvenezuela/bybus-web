import React from 'react'
import { Storage } from 'aws-amplify'
const useImage = () => {
    const getUploadedImage = async (path = "") => {
        try {
            if (path === "") return console.log("Path Vacio")
            const file = await Storage.get(path, {
                level: "public"
            });
            console.log("FILE: ", file)
            return file
        } catch (error) {
            console.error("ERROR AL CARGAR LA FOTO: ", error)
            return null
        }

    }
    return {
        getUploadedImage
    }

}

export default useImage