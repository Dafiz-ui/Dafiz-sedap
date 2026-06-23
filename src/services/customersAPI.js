import { supabase } from "../lib/supabaseClient";

export const customersAPI = {
  async fetchCustomers() {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async fetchCustomer(id) {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  async createCustomer(data) {
    const { data: customer, error } = await supabase
      .from("customers")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        age: Number(data.age) || null,
        gender: data.gender,
      })
      .select()
      .single();

    if (error) throw error;
    return customer;
  },

  async updateCustomer(id, data) {
    const { data: customer, error } = await supabase
      .from("customers")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return customer;
  },

  async deleteCustomer(id) {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw error;
  },
};
