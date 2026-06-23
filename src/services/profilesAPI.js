import { supabase } from "../lib/supabaseClient";

export const getDiscountByTier = (tier) => {
  switch (tier) {
    case "platinum":
      return 20;
    case "gold":
      return 15;
    case "silver":
      return 10;
    default:
      return 5;
  }
};

export const getTierByPoints = (points) => {
  if (points >= 1000) return "platinum";
  if (points >= 500) return "gold";
  if (points >= 200) return "silver";
  return "bronze";
};

export const profilesAPI = {
  async getCurrentProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  async updatePoints(userId, pointsToAdd, orderId) {
    const profile = await this.getCurrentProfile(userId);
    const points = Number(profile.points || 0) + Number(pointsToAdd || 0);
    const tier = getTierByPoints(points);

    const { data, error } = await supabase
      .from("profiles")
      .update({ points, tier })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;

    await supabase.from("member_points_logs").insert({
      user_id: userId,
      order_id: orderId,
      points: pointsToAdd,
      note: "Order completed",
    });

    return data;
  },
};
