import { auth } from "@/auth";
import {
  ensureInviteeAccessByToken,
  getShareRecordByToken,
} from "@/lib/timecapsule/aiframeSharing";
import { getUserById } from "@/lib/auth/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SharedTimeCapsulePageProps {
  params: { token: string };
}

export default async function SharedTimeCapsulePage({
  params,
}: SharedTimeCapsulePageProps) {
  const session = await auth();
  const record = await getShareRecordByToken(params.token);
  if (!record || !record.isShared || !record.shareToken) {
    notFound();
  }

  if (session?.userId) {
    const currentUser = await getUserById(session.userId).catch(() => null);
    const inviteeEmail = currentUser?.email ?? session.user?.email ?? null;
    const hydrated =
      inviteeEmail && record.shareToken
        ? await ensureInviteeAccessByToken({
            shareToken: record.shareToken,
            inviteeEmail,
          })
        : record;
    const owner = await getUserById(record.userId).catch(() => null);
    const resolved = hydrated ?? record;
    const paramsForRedirect = new URLSearchParams({
      sharedToken: params.token,
      frameSetId: resolved.frameSetId,
      frameVersion: resolved.frameVersion,
    });
    if (resolved.title) {
      paramsForRedirect.set("sharedName", resolved.title);
    }
    if (owner?.name) {
      paramsForRedirect.set("ownerName", owner.name);
    }
    if (owner?.email) {
      paramsForRedirect.set("ownerEmail", owner.email);
    }
    if (resolved.shareMode) {
      paramsForRedirect.set("shareMode", resolved.shareMode);
    }
    if (resolved.lastSyncedAt) {
      paramsForRedirect.set("lastSyncedAt", resolved.lastSyncedAt);
    }
    redirect(`/ai-frames?${paramsForRedirect.toString()}`);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            {record.title || "Shared TimeCapsule"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            A teammate invited you to collaborate on this TimeCapsule project.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-100 p-3 space-y-1">
            <p className="text-sm text-slate-600">
              Sign in with the invited email to access this project directly in
              AI Frames. We’ll verify your invite and load the workspace
              instantly—no public link required.
            </p>
            <p className="text-xs text-slate-500">
              Project details stay hidden until you authenticate, keeping the
              owner’s information private.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p>
              Sign in with the invited email to see this project under{" "}
              <strong>Shared with me</strong>.
            </p>
            <p>
              If you haven’t signed up yet, create an account using the invite
              email so the project appears automatically.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="flex-1">
              <Link href="/auth/signin">Sign in</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/auth/signup">Create account</Link>
            </Button>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            Already signed in? Go to{" "}
            <Link href="/ai-frames" className="underline">
              AI Frames
            </Link>{" "}
            and open the project from the TimeCapsule selector.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

