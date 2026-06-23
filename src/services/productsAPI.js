import { supabase } from "../lib/supabaseClient";

export const productsAPI = {
  async fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async fetchProduct(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createProduct(data) {
    const { data: product, error } = await supabase
      .from("products")
      .insert({
        title: data.title,
        code: data.code,
        category: data.category,
        brand: data.brand,
        price: Number(data.price),
        stock: Number(data.stock),
      })
      .select()
      .single();

    if (error) throw error;
    return product;
  },

  async updateProduct(id, data) {
    const { data: product, error } = await supabase
      .from("products")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return product;
  },

  async deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },
};
