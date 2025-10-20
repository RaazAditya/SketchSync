import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards, createBoard } from "@/features/boards/boardsSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: boards, loading, error } = useSelector((state) => state.boards);

  // Local state for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  // Open dialog
  const openDialog = () => setIsDialogOpen(true);
  // Close dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
    setBoardTitle("");
  };

  // Handle create board with user-provided name
  const handleCreateBoard = async () => {
    if (!boardTitle.trim()) return; // prevent empty title

    try {
      const result = await dispatch(createBoard({ title: boardTitle.trim() }));
      if (createBoard.fulfilled.match(result)) {
        closeDialog();
        navigate(`/board/${result.payload._id}`);
      }
    } catch (err) {
      console.error("Error creating board:", err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Boards</h1>
        <Button onClick={openDialog}>🖌️ Create New Board</Button>
      </div>

      {loading && <p>Loading boards...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(boards) && boards.length > 0 ? (
          boards.map((board) => (
            <div
              key={board._id}
              className="p-4 bg-muted rounded-2xl hover:shadow-lg cursor-pointer transition"
              onClick={() => navigate(`/board/${board._id}`)}
            >
              <h2 className="font-semibold text-lg">{board.title}</h2>
              <p className="text-sm text-gray-500 mt-2">
                Last edited: {new Date(board.updatedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No boards yet. Create one!</p>
        )}
      </div>

      {/* Dialog for board name input */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Board</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Enter board name"
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
            autoFocus
          />
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleCreateBoard}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
