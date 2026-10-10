/**
 * Supabase Storage and REST API Helper for Fleearn
 * Handles file uploads to Supabase Storage, public CDN URL generation,
 * state synchronization, and connection verification.
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  bucketName: string;
  isEnabled: boolean;
}

export const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  url: 'https://vmlrbgdafpjrvufpdvof.supabase.co',
  anonKey: 'sb_publishable_vbXdGW6PSaBB2B77SdDl3g_PUj8Iezg',
  bucketName: 'fleearn-storage',
  isEnabled: true,
};

/**
 * Check if the specified bucket exists in Supabase
 */
export async function checkBucketExists(config: SupabaseConfig): Promise<{ exists: boolean; message: string }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();
  const bucket = config.bucketName.trim();

  if (!cleanUrl || !cleanKey) {
    return { exists: false, message: 'Supabase URL বা কী প্রদান করা হয়নি।' };
  }

  try {
    const res = await fetch(`${cleanUrl}/storage/v1/bucket/${bucket}`, {
      method: 'GET',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
      },
    });

    if (res.ok) {
      return { exists: true, message: `'${bucket}' বাকেট সফলভাবে পাওয়া গেছে ও সক্রিয় রয়েছে।` };
    } else if (res.status === 404) {
      return {
        exists: false,
        message: `'${bucket}' নামের বাকেটটি পাওয়া যায়নি। অনুগ্রহ করে Supabase ড্যাশবোর্ডে Storage → New bucket এ গিয়ে '${bucket}' নামে একটি Public Bucket তৈরি করুন।`,
      };
    } else {
      return {
        exists: false,
        message: `বাকেট স্ট্যাটাস যাচাই ত্রুটি (${res.status})`,
      };
    }
  } catch (err: any) {
    return {
      exists: false,
      message: `সংযোগ স্থাপন সম্ভব হয়নি: ${err.message || 'নেটওয়ার্ক ত্রুটি'}`,
    };
  }
}

/**
 * Test connectivity to a Supabase project using the REST / Storage endpoints
 */
export async function testSupabaseConnection(
  config: SupabaseConfig
): Promise<{ success: boolean; message: string; bucketFound?: boolean }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();
  const targetBucket = (config.bucketName || 'fleearn-storage').trim();

  if (!cleanUrl || !cleanKey) {
    return {
      success: false,
      message: 'Supabase URL এবং Anon Key অবশ্যই প্রদান করতে হবে।',
    };
  }

  try {
    // 1. Test ping to /storage/v1/bucket
    const response = await fetch(`${cleanUrl}/storage/v1/bucket`, {
      method: 'GET',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
      },
    });

    if (response.ok) {
      const buckets = await response.json();
      const hasTargetBucket = Array.isArray(buckets) && buckets.some((b: any) => b.name === targetBucket);

      if (hasTargetBucket) {
        return {
          success: true,
          bucketFound: true,
          message: `সফলভাবে কানেক্ট হয়েছে! '${targetBucket}' বাকেট সক্রিয় ও প্রস্তুত।`,
        };
      }

      // If not in the list, test directly
      const directCheck = await checkBucketExists(config);
      if (directCheck.exists) {
        return {
          success: true,
          bucketFound: true,
          message: `সফলভাবে কানেক্ট হয়েছে! '${targetBucket}' বাকেট সক্রিয়।`,
        };
      }

      return {
        success: true,
        bucketFound: false,
        message: `Supabase কানেকশন সফল! তবে '${targetBucket}' বাকেট এখনো তৈরি করা হয়নি। Supabase ড্যাশবোর্ডে গিয়ে Storage → New bucket এ '${targetBucket}' নামে একটি Public Bucket তৈরি করুন।`,
      };
    } else {
      const errorText = await response.text();
      return {
        success: false,
        message: `কানেকশন ব্যর্থ হয়েছে (${response.status}): ${errorText || 'সার্ভার রেসপন্স দেয়নি'}`,
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `নেটওয়ার্ক বা সংযোগ ত্রুটি: ${err.message || 'Supabase সার্ভারে পৌঁছানো যায়নি'}`,
    };
  }
}

/**
 * Upload an APK file directly to Supabase Storage Bucket
 */
export async function uploadApkToSupabase(
  file: File,
  config: SupabaseConfig
): Promise<{ success: boolean; url: string; error?: string }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();
  const bucket = (config.bucketName || 'fleearn-storage').trim();

  if (!cleanUrl || !cleanKey) {
    return {
      success: false,
      url: '',
      error: 'Supabase URL বা Anon Key কনফিগার করা নেই।',
    };
  }

  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectPath = `apks/${timestamp}-${sanitizedName}`;

    const uploadUrl = `${cleanUrl}/storage/v1/object/${bucket}/${objectPath}`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/vnd.android.package-archive',
        'x-upsert': 'true',
      },
      body: file,
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({ message: response.statusText }));
      return {
        success: false,
        url: '',
        error: errJson.message || `আপলোড ব্যর্থ হয়েছে (${response.status})`,
      };
    }

    // Public CDN URL for Supabase storage
    const publicUrl = `${cleanUrl}/storage/v1/object/public/${bucket}/${objectPath}`;

    return {
      success: true,
      url: publicUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      url: '',
      error: err.message || 'ফাইল আপলোডের সময় নেটওয়ার্ক ত্রুটি ঘটেছে।',
    };
  }
}

/**
 * Upload an Image (e.g. Logo) directly to Supabase Storage Bucket
 */
export async function uploadImageToSupabase(
  file: File,
  config: SupabaseConfig
): Promise<{ success: boolean; url: string; error?: string }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();
  const bucket = (config.bucketName || 'fleearn-storage').trim();

  if (!cleanUrl || !cleanKey) {
    return {
      success: false,
      url: '',
      error: 'Supabase URL বা Anon Key কনফিগার করা নেই।',
    };
  }

  try {
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const objectPath = `images/${timestamp}-${sanitizedName}`;

    const uploadUrl = `${cleanUrl}/storage/v1/object/${bucket}/${objectPath}`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': file.type || 'image/png',
        'x-upsert': 'true',
      },
      body: file,
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({ message: response.statusText }));
      return {
        success: false,
        url: '',
        error: errJson.message || `ইমেজ আপলোড ব্যর্থ হয়েছে (${response.status})`,
      };
    }

    const publicUrl = `${cleanUrl}/storage/v1/object/public/${bucket}/${objectPath}`;
    return {
      success: true,
      url: publicUrl,
    };
  } catch (err: any) {
    return {
      success: false,
      url: '',
      error: err.message || 'ছবি আপলোডের সময় নেটওয়ার্ক ত্রুটি ঘটেছে।',
    };
  }
}

/**
 * Save complete application dataset (Notices, Apps, Company Info, Stats) into Supabase Storage as a cloud state file
 */
export async function syncDataToSupabase(
  data: any,
  config: SupabaseConfig
): Promise<{ success: boolean; error?: string }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();
  const bucket = (config.bucketName || 'fleearn-storage').trim();

  if (!cleanUrl || !cleanKey || !config.isEnabled) {
    return { success: false, error: 'Supabase নিষ্ক্রিয় অথবা ক্রিডেনশিয়াল অনুপস্থিত।' };
  }

  try {
    const objectPath = 'data/fleearn_live_state.json';
    const uploadUrl = `${cleanUrl}/storage/v1/object/${bucket}/${objectPath}`;
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
        'Content-Type': 'application/json',
        'x-upsert': 'true',
      },
      body: blob,
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errText = await response.text();
      return { success: false, error: `Supabase সিঙ্ক ব্যর্থ (${response.status}): ${errText}` };
    }
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch live dataset from Supabase Storage CDN
 */
export async function loadDataFromSupabase(config: SupabaseConfig): Promise<any | null> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const bucket = (config.bucketName || 'fleearn-storage').trim();

  if (!cleanUrl || !config.isEnabled) return null;

  try {
    const publicUrl = `${cleanUrl}/storage/v1/object/public/${bucket}/data/fleearn_live_state.json?t=${Date.now()}`;
    const response = await fetch(publicUrl, { method: 'GET' });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch {
    return null;
  }
}
