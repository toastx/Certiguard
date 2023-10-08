use anchor_lang::{prelude::*,};
declare_id!("GdMinZCHUfsLwMcMXjunX9zPN411c4qZD6kVdjwU9mFi");

#[program]
pub mod certiguard {
    use super::*;

    pub fn upload_certificate(ctx: Context<Uploadcertificate>,_id:u64,_access_control:Vec<Pubkey>,_hash:String) -> Result<()> {
        if !_access_control.contains(&ctx.accounts.issuer.key){
            return Err(ProgramError::InvalidArgument.into());
        }
        let certificate = &mut ctx.accounts.certificate;
        certificate.issuer = *ctx.accounts.issuer.key;
        msg!("Creating certificate account with issuer :{}",certificate.issuer);
        certificate.certificate_hash = _hash;
        certificate.certificate_id = _id;
        msg!("Certificate upload with hash: {:?}" ,certificate.certificate_hash);
        msg!("Certificate id: {}" ,certificate.certificate_id);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(_id: u64)]
pub struct Uploadcertificate<'info>{
    #[account(
        init,
        payer = issuer,
        space = 500,
        seeds = [_id.to_le_bytes().as_ref(),issuer.key().as_ref()],
        bump
    )]
    pub certificate: Account<'info,Certificate>,
    #[account(mut)]
    pub issuer:Signer<'info>,
    pub system_program:Program<'info,System>
}

#[derive(Accounts)]
pub struct Verifycertificate<'info>{
    #[account(mut)]
    pub certificate: Account<'info,Certificate>,
}

#[account]

pub struct Certificate {
    certificate_hash :String,
    certificate_id:u64,
    issuer:Pubkey
}





