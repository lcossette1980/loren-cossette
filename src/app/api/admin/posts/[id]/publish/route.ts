import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdminToken } from "@/lib/admin-auth";
import { getSupabase } from "@/lib/supabase";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdminToken(request);
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const { id } = await params;
    const supabase = getSupabase();

    // Get current post
    const { data: current, error: fetchError } = await supabase
      .from("blog_posts")
      .select("status, published_at, slug")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json({ error: "Post not found." }, { status: 404 });
    }

    // Toggle status
    const newStatus = current.status === "published" ? "draft" : "published";
    const updateData: Record<string, unknown> = { status: newStatus };

    if (newStatus === "published" && !current.published_at) {
      updateData.published_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("blog_posts")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error || !data) {
      console.error("Supabase publish toggle error:", error);
      return NextResponse.json(
        { error: "Failed to update publish status." },
        { status: 500 }
      );
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Publish toggle error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
