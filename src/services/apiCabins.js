import { supabase } from "../services/supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins couldn't be loaded");
  }
  return data;
}

export default async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be deleted");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabase.supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1- Create cabin
  const { error, data } = await supabase.from("cabins").insert([
    {
      ...newCabin,
      image: imagePath,
    },
  ]);
  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be created");
  }
  // 2- Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3- Delete the cabin If there was an error uploading corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.log(storageError);
    throw new Error(
      "Cabin image couldn't be uploaded and the cabin was not created",
    );
  }

  return data;
}
