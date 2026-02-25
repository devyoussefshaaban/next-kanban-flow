"use client"

import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/lib/api";

const KanbanHeader = () => {
    const { data: tasks } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks,
    });

    const count = tasks?.length || 0;
    return (
        <header className="fixed bg-white shadow-2xl top-0 left-0 right-0 z-10 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <div>
                    <h1 className="text-2xl font-bold">Kanbanic</h1>
                    <p className="text-blue-600 font-semibold italic">Board Craft</p>
                </div>
                <div>
                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{count} Tasks</span>
                </div>
            </div>
        </header>
    );
};

export default KanbanHeader