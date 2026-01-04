import React, { useState } from "react";

interface PostDescriptionProps {
	description: string | string[] | undefined;
}

export const PostDescription: React.FC<PostDescriptionProps> = ({
	description,
}) => {
	const [expanded, setExpanded] = useState(false);

	if (!description) return null;

	const text =
		typeof description === "string" ? description : description.join("\n");

			return (
				<span>
					<span
						className={`whitespace-pre-line transition-all duration-300 ${
							expanded ? "" : "line-clamp-2"
						}`}
					>
						{text}
					</span>
					{text.split("\n").length > 2 && (
						<button
							className="mt-2 text-blue-500 hover:underline"
							onClick={(e) => {
							e.stopPropagation();
							setExpanded(!expanded);
						}}
						style={{ display: 'inline', marginLeft: 8 }}
					>
						{expanded ? "Show less" : "Read more"}
					</button>
				)}
			</span>
			);
};
