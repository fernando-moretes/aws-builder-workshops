# Mission 2: portfolio online

**The question:** "How do I put a website on the internet with AWS without leaving anything open by mistake?"

| | |
|---|---|
| **Time** | About 1 hour |
| **Cost** | Normally zero at this size, within the free tier. Check your own account |
| **No AWS account?** | Do steps 1 to 3 and test the site on your computer |
| **You take away** | A site with HTTPS and a rule for distrusting AI shortcuts |

## 1. Write your hypothesis

Write down: **what is the simplest and safest way to publish a static site on AWS?** Write what you think before you ask.

## 2. Compare the AI with the documentation

Paste this into your AI assistant:

```text
You are my AWS tutor. I want to publish a one-page site, without a server.

1. Give me two options on AWS, with advantages and risks.
2. Does either of them require leaving something public? What exactly?
3. Which one has HTTPS without extra setup?
4. Give the link to the official documentation that backs each answer.
```

Now **open the links** and look for the following:

- Does the option with a site on S3 show up? The [S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) says this path requires turning off Block Public Access, recommends keeping it on, and says the site only has HTTP. Did the AI warn you about that?
- Do the links it cited exist, and do they say what it claimed?
- Did it mention Amplify? If not, ask. Compare the number of pieces in each option.

Write down what matched and what did not. Even when the AI is right, having checked is your evidence. [See a real answer](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/exemplos/).

## 3. Customize it and test on your computer

Download [index.html](https://github.com/fernando-moretes/aws-builder-workshops/blob/main/missoes/02-portfolio-no-ar/site/index.html), replace the text with your own and open it on your computer:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. Ask the AI to review how clear your text is, without writing it for you. Do not include a phone number, an address or any data you do not want to be public.

## 4. Publish with Amplify

Skip this if you do not have an account yet.

1. Put `index.html` in a `.zip` file. **Zip the file, not the folder:** the documentation warns that zipping the parent folder causes an "Access Denied" error.
2. Open the [Amplify console](https://console.aws.amazon.com/amplify/?lang=en) and choose **Create new app**.
3. Choose **Deploy without Git** and then **Next**.
4. Give the app a name, use `main` as the branch and choose **Drag and drop**.
5. Drop the `.zip` and click **Save and deploy**.
6. Open the address `https://main.xxxxx.amplifyapp.com`.

In the test below, publishing took about 48 seconds, and the site answered over HTTPS with no extra setup.

## Cleanup

If the site was only a test, delete it: in the Amplify console, open the app and use **App settings**, **General settings**, **Delete app**. Then open the address again and confirm it is offline.

## Now turn this into content

| Field | Example of what to write |
|---|---|
| **Topic** | I published my portfolio on AWS without opening anything by mistake |
| **Audience** | People who want a website and have never published anything in the cloud |
| **Problem** | Tutorials that tell you to leave everything public |
| **Goal** | Compare two options and publish one in 1 hour |
| **Evidence** | What the AI suggested, what the documentation says, your site with HTTPS, and the cleanup |

Continue with [From test to article](https://fernando-moretes.github.io/aws-builder-workshops/en/trilhas/primeiro-experimento/).

## What was tested

On 06/11/2026, the publishing ran in a real account with this `index.html`, through the AWS CLI, with the same kind of `.zip` upload: a 200 response over HTTPS, and the app was deleted right afterwards. **The console clicks follow the documentation and were not tested step by step.** Free tier values change and may vary depending on the account plan.

Sources, checked on 06/11/2026: [manual deployment on Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/manual-deploys.html), [Amplify pricing](https://aws.amazon.com/amplify/pricing/), [static site on S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html) and [free tier](https://aws.amazon.com/free/).
