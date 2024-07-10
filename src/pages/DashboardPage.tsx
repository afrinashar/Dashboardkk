import React, { useState, useEffect } from "react";
import {
  TextField,
  PrimaryButton,
  Stack,
  Link,
  DefaultButton,
  MessageBar,
  MessageBarType,
  IconButton,
} from "@fluentui/react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";

initializeIcons();

interface LinkItem {
  id: number;
  name: string;
  url: string;
}

const DashboardPage: React.FC = () => {
  const [linkName, setLinkName] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const savedLinks = localStorage.getItem("links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [editingLinkId, setEditingLinkId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  const handleAddLink = () => {
    if (!linkName || !linkUrl) {
      setError("Both Link Name and Link URL are required.");
      return;
    }

    try {
      new URL(linkUrl);
    } catch (_) {
      setError("Invalid URL.");
      return;
    }

    if (editingLinkId !== null) {
      setLinks(
        links.map((link) =>
          link.id === editingLinkId
            ? { id: editingLinkId, name: linkName, url: linkUrl }
            : link
        )
      );
      setEditingLinkId(null);
    } else {
      const newLink: LinkItem = {
        id: Date.now(),
        name: linkName,
        url: linkUrl,
      };
      setLinks([...links, newLink]);
    }

    setLinkName("");
    setLinkUrl("");
    setError(null);
  };

  const handleEditLink = (id: number) => {
    const link = links.find((link) => link.id === id);
    if (link) {
      setLinkName(link.name);
      setLinkUrl(link.url);
      setEditingLinkId(id);
    }
  };

  const handleDeleteLink = (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleLogout = () => {
    window.location.href = "/";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        styles={{ root: { maxWidth: 500, marginBottom: 20 } }}
      >
        <TextField
          label="Link Name"
          value={linkName}
          onChange={(e, newValue) => setLinkName(newValue || "")}
        />
        <TextField
          label="Link URL"
          value={linkUrl}
          onChange={(e, newValue) => setLinkUrl(newValue || "")}
        />
        <PrimaryButton
          text={editingLinkId ? "Update Link" : "Add Link"}
          onClick={handleAddLink}
        />
      </Stack>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
          {error}
        </MessageBar>
      )}
      <Stack tokens={{ childrenGap: 10 }}>
        {links.map((link) => (
          <Stack
            horizontal
            key={link.id}
            horizontalAlign="space-between"
            styles={{ root: { width: "100%" } }}
          >
            <Link
              href={link.url}
              target="_blank"
              styles={{ root: { flexGrow: 1 } }}
            >
              {link.name}
            </Link>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              title="Edit"
              ariaLabel="Edit"
              onClick={() => handleEditLink(link.id)}
            />
            <IconButton
              iconProps={{ iconName: "Delete" }}
              title="Delete"
              ariaLabel="Delete"
              onClick={() => handleDeleteLink(link.id)}
            />
          </Stack>
        ))}
      </Stack>
      <DefaultButton
        text="Logout"
        onClick={handleLogout}
        styles={{ root: { marginTop: 20 } }}
      />
    </div>
  );
};

export default DashboardPage;
