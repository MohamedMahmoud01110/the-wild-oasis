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

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabase.supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1- Create/Edit cabin
  let query = await supabase.from("cabins");
  // A) Create cabin
  if (!id) {
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ]);
  }
  // B) Edit
  if (id) {
    query = query
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", id);
  }
  const { error, data } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabin couldn't be created");
  }

  // 2- Upload the image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3- Delete the cabin If there was an error uploading corresponding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image couldn't be uploaded and the cabin was not created",
    );
  }

  return data;
}
