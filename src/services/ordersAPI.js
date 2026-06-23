import { supabase } from "../lib/supabaseClient";
import { getDiscountByTier, profilesAPI } from "./profilesAPI";

const makeOrderNumber = () => `ORD-${Date.now()}`;

export const ordersAPI = {
  async fetchOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*, customers(first_name, last_name), order_items(*)")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createOrder({ userId, customerId, product, quantity, tier }) {
    const subtotal = Number(product.price) * Number(quantity);
    const discountPercent = getDiscountByTier(tier);
    const discountAmount = subtotal * (discountPercent / 100);
    const totalPrice = subtotal - discountAmount;
    const pointsEarned = Math.floor(totalPrice / 10000);

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        order_number: makeOrderNumber(),
        user_id: userId,
        customer_id: customerId || null,
        status: "pending",
        subtotal: subtotal,
        discount_percent: discountPercent,
        discount_amount: discountAmount,
        total_price: totalPrice,
        points_earned: pointsEarned,
      })
      .select()
      .single();

    if (error) throw error;

    const { error: itemError } = await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: product.id,
      product_title: product.title,
      quantity: Number(quantity),
      unit_price: Number(product.price),
      line_total: subtotal,
    });

    if (itemError) throw itemError;
    return order;
  },

  async updateOrderStatus(order, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", order.id)
      .select()
      .single();

    if (error) throw error;

    if (status === "completed" && order.status !== "completed" && order.user_id) {
      await profilesAPI.updatePoints(order.user_id, order.points_earned, order.id);
    }

    return data;
  },

  async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },
};
