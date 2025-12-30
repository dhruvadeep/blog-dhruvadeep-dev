"use client";

import { Button } from "@/components/ui/button";
import {
  Facebook,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  Share2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: (props: any) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          {...props}
        >
          <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
          <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0 .5-.5l.14-.3A4.38 4.38 0 0 0 8 4a4.38 4.38 0 0 0-2.7 7.7c.35.39.75.75 1.15 1.15l-1 1-.3-.15A4.38 4.38 0 0 0 4 8 4.38 4.38 0 0 0 8 4a4.38 4.38 0 0 0 .5.5v.5a.5.5 0 0 0 1 0" />
          <path d="M21 16.5a2.5 2.5 0 0 1-5 0v-5a2.5 2.5 0 0 1 5 0v5z" />
          <path d="M16 21v-2a4 4 0 0 0-4-4H6" />
        </svg>
      ),
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <div className="flex items-center gap-2 my-6">
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Share2 className="h-4 w-4" />
        Share:
      </span>
      <TooltipProvider>
        {shareLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => window.open(link.href, "_blank")}
              >
                <link.icon className="h-4 w-4" />
                <span className="sr-only">Share on {link.name}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on {link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={copyToClipboard}
            >
              <LinkIcon className="h-4 w-4" />
              <span className="sr-only">Copy link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
