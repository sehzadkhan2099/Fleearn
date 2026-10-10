/**
 * Supabase Storage and REST API Helper for Fleearn
 * Handles file uploads to Supabase Storage, public CDN URL generation,
 * and connection verification.
 */

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  bucketName: string;
  isEnabled: boolean;
}

export const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  url: '',
  anonKey: '',
  bucketName: 'fleearn-storage',
  isEnabled: false,
};

/**
 * Test connectivity to a Supabase project using the REST / Storage endpoints
 */
export async function testSupabaseConnection(
  config: SupabaseConfig
): Promise<{ success: boolean; message: string }> {
  const cleanUrl = config.url.trim().replace(/\/+$/, '');
  const cleanKey = config.anonKey.trim();

  if (!cleanUrl || !cleanKey) {
    return {
      success: false,
      message: 'Supabase URL এবং Anon Key অবশ্যই প্রদান করতে হবে।',
    };
  }

  if (!cleanUrl.startsWith('https://') || !cleanUrl.includes('.supabase.co')) {
    return {
      success: false,
      message: 'সঠিক Supabase URL প্রদান করুন (যেমন: https://your-project.supabase.co)',
    };
  }

  try {
    // Test storage bucket endpoint
    const response = await fetch(`${cleanUrl}/storage/v1/bucket`, {
      method: 'GET',
      headers: {
        apikey: cleanKey,
        Authorization: `Bearer ${cleanKey}`,
      },
    });

    if (response.ok) {
      const buckets = await response.json();
      const hasTargetBucket = Array.isArray(buckets) && buckets.some((b: any) => b.name === config.bucketName);
      if (hasTargetBucket) {
        return {
          success: true,
          message: `সফলভাবে কানেক্ট হয়েছে! '${config.bucketName}' বাকেট পাওয়া গেছে।`,
        };
      } else {
        return {
          success: true,
          message: `Supabase কানেক্ট হয়েছে! তবে '${config.bucketName}' বাকেট তৈরি না থাকলে দয়া করে তৈরি করুন।`,
        };
      }
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
