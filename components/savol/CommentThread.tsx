"use client";

import { useState } from "react";
import { ChevronRight, Minus } from "lucide-react";
import AnswerReplyForm from "@/components/savol/AnswerReplyForm";
import type { AnswerReply } from "@/lib/savol/answer-replies-repository";

type DisplayReply = AnswerReply & { authorName: string; authorInitials: string; formattedDate: string };
export type CommentNode = DisplayReply & { children: CommentNode[] };

export function buildCommentTree(replies: ReadonlyArray<DisplayReply>): CommentNode[] {
  const nodes = new Map<string, CommentNode>();
  for (const reply of replies) nodes.set(reply.id, { ...reply, children: [] });
  const roots: CommentNode[] = [];
  for (const reply of replies) {
    const node = nodes.get(reply.id)!;
    const parent = reply.parentId && nodes.get(reply.parentId);
    if (parent && parent.id !== node.id && !wouldCycle(node.id, parent, nodes)) parent.children.push(node);
    else roots.push(node);
  }
  return roots;
}

function wouldCycle(id: string, parent: CommentNode, nodes: Map<string, CommentNode>): boolean {
  const seen = new Set<string>([id]);
  let current: CommentNode | undefined = parent;
  while (current) {
    if (seen.has(current.id)) return true;
    seen.add(current.id);
    current = current.parentId ? nodes.get(current.parentId) : undefined;
  }
  return false;
}

type Props = {
  locale: "uz" | "de";
  slug: string;
  answerId: string;
  replies: DisplayReply[];
};

function CommentItem({ node, props, last }: { node: CommentNode; props: Props; last: boolean }) {
  const [expanded, setExpanded] = useState(true);
  const count = node.children.length;
  return (
    <li
      className="relative grid min-w-0 list-none"
      style={{
        // The gutter is a real grid column: Safari and Chromium use the same origin.
        gridTemplateColumns: "27px minmax(0, 1fr)",
        borderLeft: last ? "1px solid transparent" : "1px solid #94a3b8",
        paddingBottom: last ? 0 : 16,
      }}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        width="27"
        height="20"
        viewBox="0 0 27 20"
        fill="none"
        className="pointer-events-none col-start-1 row-start-1 block overflow-visible text-slate-400 dark:text-slate-500"
      >
        <path d="M 0 0 V 3 Q 0 19 16 19 H 25" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>
      <div className="col-start-2 row-start-1 flex min-w-0 items-start gap-2.5">
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-xs font-bold text-emerald-800 ring-1 ring-slate-200 dark:bg-emerald-900 dark:text-emerald-100 dark:ring-slate-700"
          style={{ width: 36, height: 36, minWidth: 36, minHeight: 36, maxWidth: 36, maxHeight: 36, flex: "0 0 36px", borderRadius: "50%" }}
        >
          {node.authorInitials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="font-semibold text-slate-900 dark:text-white">{node.authorName}</span>
            <time dateTime={node.createdAt} className="text-slate-500 dark:text-slate-400">{node.formattedDate}</time>
          </div>
          <p className="mt-1 whitespace-pre-wrap break-words text-sm font-normal leading-[1.55rem] text-slate-800 dark:text-slate-200">{node.body}</p>
          <div className="flex flex-wrap items-center gap-2">
            <AnswerReplyForm locale={props.locale} slug={props.slug} answerId={props.answerId} parentId={node.id} />
            {count > 0 && (
              <button type="button" aria-expanded={expanded} onClick={() => setExpanded(v => !v)} className="mt-4 inline-flex items-center gap-1 rounded-md px-1 text-xs text-slate-500 hover:text-emerald-700 dark:text-slate-400">
                <span>{expanded ? <Minus size={13} /> : <ChevronRight size={13} />}</span>
                {props.locale === "de" ? "Antworten" : "Javoblar"} ({count})
              </button>
            )}
          </div>
        </div>
      </div>
      {expanded && count > 0 && <div className="col-start-2 min-w-0" style={{ marginLeft: 18 }}><CommentList props={props} nodes={node.children} /></div>}
    </li>
  );
}

function CommentList({ props, nodes }: { props: Props; nodes: CommentNode[] }) {
  return <ul className="relative mt-3 min-w-0">{nodes.map((node, index) => <CommentItem key={node.id} node={node} props={props} last={index === nodes.length - 1} />)}</ul>;
}

export default function CommentThread(props: Props) {
  return <CommentList props={props} nodes={buildCommentTree(props.replies)} />;
}
