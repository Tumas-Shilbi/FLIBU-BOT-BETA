import fetch from 'node-fetch';

const threads = {
    dl: async (link) => {
        if (!link?.includes('threads.net')) {
            throw new Error('*❌ الرابط غير صحيح.*\n\n*مثال:*\n- https://www.threads.net/...');
        }
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const submit = async (attempt = 1) => {
            try {
                console.log(`🔄 *المحاولة رقم ${attempt} للحصول على البيانات...*`);
                const {
                    data
                } = await axios.get('https://threads.snapsave.app/api/action', {
                    params: {
                        url: link
                    },
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'referer': 'https://threads.snapsave.app/',
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
                    },
                    timeout: 10000 // 10 ثواني مهلة
                });
                if (data.status_code !== 0 || !data.items?.length) {
                    throw new Error('*⚠️ تعذر التحميل.*');
                }

                return data;
            } catch (error) {
                if (error.response?.status === 500 && attempt < 3) {
                    console.warn(`⚠️ *خطأ في الخادم (500). إعادة المحاولة رقم ${attempt + 1} بعد ثانيتين...*`);
                    await delay(2000);
                    return submit(attempt + 1);
                }

                if (attempt >= 3) {
                    throw new Error('*❌ فشلت العملية بعد 3 محاولات.*');
                }

                throw error;
            }
        };

        try {
            const data = await submit();

            const type = (type) => ({
                GraphImage: '*صورة*',
                GraphVideo: '*فيديو*',
                GraphSidecar: '*معرض*'
            } [type] || type);

            return {
                postInfo: {
                    id: data.postinfo.id,
                    username: data.postinfo.username,
                    avatarUrl: data.postinfo.avatar_url,
                    mediaTitle: data.postinfo.media_title,
                    type: type(data.postinfo.__type)
                },
                media: data.items.map(item => ({
                    type: type(item.__type),
                    id: item.id,
                    url: item.url,
                    width: item.width,
                    height: item.height,
                    ...(item.__type === 'GraphVideo' && {
                        thumbnailUrl: item.display_url,
                        videoUrl: item.video_url,
                        duration: item.video_duration
                    })
                }))
            };
        } catch (error) {
            console.error(`${error.message}`);
            throw new Error(error.message);
        }
    }
};

const handler = async (m, {
    text,
    conn
}) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: '*⚠️ الرجاء إدخال رابط صالح.*',
        }, {
            quoted: m
        });
    }
    try {
        await conn.sendMessage(m.chat, {
            text: '*⏳ جارٍ معالجة الرابط... يرجى الانتظار.*',
        }, {
            quoted: m
        });

        const data = await threads.dl(text);
        const {
            postInfo,
            media
        } = data;

        await conn.sendMessage(m.chat, {
            text: `📥 *معلومات المنشور*\n👤 *اسم المستخدم:* ${postInfo.username}\n📄 *العنوان:* ${postInfo.mediaTitle}\n📂 *النوع:* ${postInfo.type}`,
        }, {
            quoted: m
        });

        for (const item of media) {
            if (item.type === '*صورة*') {
                await conn.sendMessage(m.chat, {
                    image: {
                        url: item.url
                    },
                    caption: `📷 *صورة*`,
                }, {
                    quoted: m
                });
            } else if (item.type === '*فيديو*') {
                await conn.sendMessage(m.chat, {
                    video: {
                        url: item.videoUrl
                    },
                    caption: `🎥 *فيديو*\n⏱ *المدة:* ${item.duration} ثانية`,
                }, {
                    quoted: m
                });
            }
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `❌ *خطأ:* ${error.message}`,
        }, {
            quoted: m
        });
    }
};

handler.command = ['threads'];
handler.tags = ['downloader'];
handler.help = ['threads'];
export default handler;
