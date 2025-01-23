conn.ev.on("group-participants.update", async (update) => {
  const { participants, action } = update;

  if (action === "remove") { // التحقق إذا كان المستخدم قد غادر المجموعة
    for (let user of participants) {
      try {
        // حظر المستخدم
        await conn.updateBlockStatus(user, "block");
        console.log(`✅ تم حظر المستخدم: ${user} بعد مغادرته المجموعة.`);
      } catch (err) {
        console.error(`❌ حدث خطأ أثناء محاولة حظر المستخدم: ${user}`, err);
      }
    }
  }
});
