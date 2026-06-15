// ============================================================
// HAZE Manager — Configuration File
// Edit these values to match your Discord server setup.
// ============================================================

module.exports = {
  // ── Bot Meta ──────────────────────────────────────────────
  botName: 'HAZE Manager',
  clanName: 'HAZE',
  clanGame: 'Roblox Rivals',
  clanColor: 0x7B2FBE, // Purple — HAZE brand color

  // ── Guild / Server ────────────────────────────────────────
  guildId: process.env.GUILD_ID || 'YOUR_GUILD_ID',

  // ── Staff Role IDs ────────────────────────────────────────
  // Replace with your actual role IDs
  roles: {
    owner:     '1510266118659641474',
    coOwner:   '1510269079762632704',
    highRank:  '1510320927282561305',    // Can use admin commands
    staff:     '1510338990526435539',         // Can use moderation commands
    member:    '1512779524721610894',        // Auto-assigned on join
    trialist:  '1510340711927513099',      // Given to tryout passes
    verified:  '1511714857408270468',      // Auto role for all new joins
  },

  // ── Log Channel IDs ───────────────────────────────────────
  channels: {
    rosterChannel:      '1515757756085174465',
    clanInfoChannel:    '1515760321908965656',
    welcomeChannel:      '1510314920053571785',
    leaveChannel:        'LEAVE_CHANNEL_ID',
    modLogChannel:       '1510337433168773200',
    messageLogChannel:   'MESSAGE_LOG_CHANNEL_ID',
    memberLogChannel:    'MEMBER_LOG_CHANNEL_ID',
    voiceLogChannel:     'VOICE_LOG_CHANNEL_ID',
    tryoutLogChannel:    '',
    ticketCategory:      '1510624901147394058',
    ticketLogChannel:    '',
  },

  // ── Auto Role IDs on Join ─────────────────────────────────
  autoRoles: [
    '1511714857408270468', // Role(s) to assign when a member joins
  ],

  // ── Moderation Settings ───────────────────────────────────
  moderation: {
    maxWarnings: 3,   // Warnings before auto-kick
    maxStrikes: 2,    // Strikes before auto-ban
    defaultMuteDuration: 10, // Minutes
  },

  // ── Clan Info ─────────────────────────────────────────────
  clanInfo: {
    founded: '2026',
    motto: 'Dominate. Conquer. Haze.',
    wins: 0,          // Update manually or wire to DB
    losses: 0,
    members: 20,
  },
};
