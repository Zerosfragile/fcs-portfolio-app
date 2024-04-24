import { MinimalistItemSocialCardPreviewDisplay } from "@/lib/vault/components/minimalist-item-social-card";

/**
 * Archive page - Displays all vault components, to ensure the tailwind css is generated on build
 */
export default function Archive() {
  return (
    <div className="grid place-items-center min-h-screen bg-OffWhite">
      <MinimalistItemSocialCardPreviewDisplay />
    </div>
  );
}
