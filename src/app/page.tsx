import { redirect } from "next/navigation";

export default function Home() {
  // Automatic redirection
  redirect("/posts");
}
