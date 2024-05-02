import { Domain, DomainInfo } from "../types";

export const DOMAIN_INFO: Record<Domain, DomainInfo> = {
	[Domain.Arcana]: {
		color: "#582e6a",
	},
	[Domain.Blade]: {
		color: "#88211b",
	},
	[Domain.Bone]: {
		color: "#a8b1b5",
	},
	[Domain.Codex]: {
		color: "#1f497d",
	},
	[Domain.Grace]: {
		color: "#ab3676",
	},
	[Domain.Midnight]: {
		color: "#07090b",
	},
	[Domain.Sage]: {
		color: "#06582a",
	},
	[Domain.Splendor]: {
		color: "#c2a518",
	},
	[Domain.Valor]: {
		color: "#b65b1c",
	},
};

export const DESCRIPTION_MAX_SIZE = 460;
