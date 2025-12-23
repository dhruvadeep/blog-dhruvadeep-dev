import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const subscribers = [
  { id: 1, email: "john@example.com", date: "2025-06-20", status: "Active" },
  { id: 2, email: "jane@example.com", date: "2025-06-19", status: "Active" },
  {
    id: 3,
    email: "bob@example.com",
    date: "2025-06-18",
    status: "Unsubscribed",
  },
  { id: 4, email: "alice@example.com", date: "2025-06-18", status: "Active" },
  { id: 5, email: "charlie@example.com", date: "2025-06-17", status: "Active" },
];

const messages = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subject: "Collaboration",
    message: "Hi, I'd like to collaborate on a project...",
    date: "2025-06-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Feedback",
    message: "Great article on minimalism!",
    date: "2025-06-19",
  },
];

export default function SubscribersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Community</h2>
        <p className="text-muted-foreground">Manage subscribers and messages</p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Newsletter Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Subscribed</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>{sub.email}</TableCell>
                    <TableCell>{sub.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          sub.status === "Active" ? "default" : "secondary"
                        }
                      >
                        {sub.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((msg) => (
                  <TableRow key={msg.id}>
                    <TableCell>
                      <div className="font-medium">{msg.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {msg.email}
                      </div>
                    </TableCell>
                    <TableCell>{msg.subject}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {msg.message}
                    </TableCell>
                    <TableCell>{msg.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
