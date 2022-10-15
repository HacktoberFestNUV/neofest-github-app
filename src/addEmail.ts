import { Octokit } from 'octokit';

export const addEmailTOOrg = async (authToken: string, email: string) => {
  try {
    console.log(email);

    const octokit = new Octokit({ auth: `${authToken}` });

    // const response = await octokit.request('GET /orgs/{org}/repos', {
    //   org: 'octokit',
    //   type: 'private',
    // });
    const response = await octokit.request('GET /user/orgs', {});
    console.log(response);
    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
};
